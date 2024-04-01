const Stripe = require("stripe");
const shortid = require("shortid");
const { Sequelize, QueryTypes } = require("sequelize");
const { PubSub } = require("@google-cloud/pubsub");

const stripe = Stripe("sk_test_key");
const sequelize = new Sequelize("db_name", "username", "password", {
  host: "db_host",
  dialect: "postgres",
  logging: false,
});
const pubsub = new PubSub({
  projectId: "project_id",
  keyFilename: "key_file_root_folder",
});
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.payment = async (req, res) => {
  const applicationFeeObj = await getApplicationFee();
  if (!req.body.org_subscription) {
    const org_subscription = await getTodaysSubscription();
    if (org_subscription.length > 0) {
      await callPayment(org_subscription, applicationFeeObj);
    }
    res.status(200).json(org_subscription);
  } else {
    console.log(JSON.stringify(req.body.org_subscription));
    const paymentResponse = await chargePayment(
      req.body.org_subscription,
      applicationFeeObj
    );
    res.status(200).json(paymentResponse);
  }
};

async function getTodaysSubscription() {
  const org_subscription = await sequelize.query(
    `SELECT a."id",
    a."createdAt",
    a."createdBy",
    a."updatedAt",
    a."updatedBy",
    a."isActive",
    "subscriptionDate",
    "nextPaymentDate",
    "subscriptionAmount",
    "contactNumber",
    "contactPerson",
    "email",
    "stripeCustomerId",
    "organizationName" 
    FROM public.org_subscription a 
    INNER JOIN public.organization b 
    ON "organizationId" = b.id 
    WHERE "nextPaymentDate"::timestamp::date = CURRENT_DATE`,
    { type: QueryTypes.SELECT }
  );
  return org_subscription;
}

async function getApplicationFee() {
  const applicationFee = await sequelize.query(
    `SELECT * FROM public.application_fee
    WHERE id = 1`,
    { type: QueryTypes.SELECT }
  );
  return applicationFee;
}

async function calculateApplicationFee(os, applicationFeeObj) {
  if (applicationFeeObj[0].type == 1) {
    let fee =
      (parseFloat(applicationFeeObj[0].applicationFeePercentage) / 100) *
        os.subscriptionAmount +
      parseFloat(applicationFeeObj[0].applicationFeeAmount);
    return parseFloat(fee.toFixed(2));
  } else {
    return applicationFeeObj[0].applicationFeeAmount;
  }
}

async function callPayment(org_subscription, applicationFeeObj) {
  let promiseArr = [];
  org_subscription.forEach((os) => {
    promiseArr.push(chargePayment(os, applicationFeeObj));
  });
  await Promise.all(promiseArr);
}

async function chargePayment(os, applicationFeeObj) {
  const applicationFee = await calculateApplicationFee(os, applicationFeeObj);
  const reqChargeObj = {
    amount: Math.round(os.subscriptionAmount * 100),
    currency: "gbp", // os.currency
    customer: os.stripeCustomerId,
    application_fee_amount: applicationFee * 100,
    description: `${os.organizationName}--${os.email}`,
    metadata: {
      orgSubscriptionId: os.id,
      orgId: os.organizationId,
      orgName: os.organizationName,
    },
  };
  const paymentUnique = createPaymentUnique();
  try {
    console.log(reqChargeObj);
    const res = await stripe.charges.create(reqChargeObj, {
      stripeAccount: "acct_id_stripe",
    });
    // Update nextPaymentDate as well as the subscriptionDate of the organization
    await updateNextPaymentDate(os);
    // Update subscription_history and subscription_log
    await createSubscritionHistoryAndLogs(
      reqChargeObj,
      res,
      os,
      "Success",
      paymentUnique
    );
    // Publish to topic for success email
    await sendEmail(res, os, "Success", paymentUnique);
    return res;
  } catch (error) {
    // Update subscription_history and subscription_log
    await createSubscritionHistoryAndLogs(
      reqChargeObj,
      error,
      os,
      "Failure",
      paymentUnique
    );
    // Publish to topic for failure email
    await sendEmail(error, os, "Failure", paymentUnique);
    return error;
  }
}

async function sendEmail(paymentRes, os, type, paymentUnique) {
  const topic = pubsub.topic("email_sms_topic");
  let msg = {
    toEmail: [
      "rutuparna.rout@kare4u.in",
      // "brahma.acharya@kare4u.in",
      // "europe@activitypro.co.uk",
    ],
    subject: "",
    text: "",
    html: "",
  };
  if (type == "Failure") {
    const failureTemplate = await createFailureEmailTemplate(
      os,
      paymentRes,
      paymentUnique
    );
    msg.subject = "SiteMaster: Payment failed - Thank you!";
    msg.text = "Payment Failure Email";
    msg.html = failureTemplate;
  } else {
    const successTemplate = await createSucessEmailTemplate(
      os,
      paymentRes,
      paymentUnique
    );
    msg.subject = "SiteMaster: Payment successful - Thank you!";
    msg.text = "Payment Sucess Email";
    msg.html = successTemplate;
  }
  const messageBuffer = Buffer.from(JSON.stringify(msg));
  try {
    const messageId = await topic.publish(messageBuffer);
    console.log(`Message Id is: ${messageId}`);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}

async function updateNextPaymentDate(os) {
  const nextPaymentDate = await getNextPaymentDate(os.nextPaymentDate);
  await sequelize.query(
    `UPDATE public.org_subscription
    SET "nextPaymentDate" = :nextPaymentDate, "subscriptionDate" = :subscriptionDate
    WHERE id = :osId`,
    {
      replacements: {
        nextPaymentDate: nextPaymentDate,
        subscriptionDate: os.nextPaymentDate,
        osId: os.id,
      },
      type: QueryTypes.UPDATE,
    }
  );
}

async function getNextPaymentDate(date) {
  let nextPaymentDate = new Date(date);
  nextPaymentDate.setDate(nextPaymentDate.getDate() + 30);
  return nextPaymentDate;
}

async function createSubscritionHistoryAndLogs(
  reqBody,
  resBody,
  os,
  type,
  paymentUnique
) {
  const currentDate = new Date().toISOString();
  const stripeChargeId = type == "Failure" ? "CHARGE_FAILED" : resBody.id;
  const status = type == "Failure" ? 0 : 1;
  const subscription_history = await sequelize.query(
    `INSERT INTO public.subscription_history(
      "paymentUnique", "paymentDate", "stripeChargeId", status, "orgSubscriptionId")
      VALUES (:paymentUnique, :currentISODate, :chargeId, :paymentStatus,:osId) RETURNING *`,
    {
      replacements: {
        paymentUnique: paymentUnique,
        currentISODate: currentDate,
        chargeId: stripeChargeId,
        paymentStatus: status,
        osId: os.id,
      },
      type: QueryTypes.INSERT,
      raw: true,
    }
  );

  const subscriptionHistoryId = subscription_history[0][0].id;
  const reqObj = JSON.stringify(reqBody);
  const resObj = JSON.stringify(resBody);
  await sequelize.query(
    `INSERT INTO public.subscription_log(
        request, response, "subscriptionHistoryId")
        VALUES (:reqObj, :resObj, :subscriptionHistoryId)`,
    {
      replacements: {
        reqObj: reqObj,
        resObj: resObj,
        subscriptionHistoryId: subscriptionHistoryId,
      },
      type: QueryTypes.INSERT,
      raw: true,
    }
  );
}
async function createSucessEmailTemplate(
  orgDetails,
  sucessResponse,
  paymentUnique
) {
  const currentDateTime = new Date().toLocaleString("en-US", {
    timeZone: "Europe/London",
  });
  let successEmailTemplate = `<h1 style="color: green; text-align: center;">-------SUCCESS-------</h1>
  <h1 style="text-align: center;"><u>${orgDetails.organizationName}</u></h1>
  <h2>Your monthly subscription has been successfully processed.</h2>
  <h4>Order ID: ${paymentUnique}</h4>
  <p>Processed on ${currentDateTime} United Kingdom.</p>
  <br>
  <table style="width:100%; border-bottom: 1px solid darkgrey">
     <tr>
        <td>Monthly plan:</td>
        <td align="right"><strong>£ ${parseFloat(
          orgDetails.subscriptionAmount
        ).toFixed(2)}</strong></td>
     </tr>
     <tr>
        <td>Total:</td>
        <td align="right"><strong>£ ${parseFloat(
          orgDetails.subscriptionAmount
        ).toFixed(2)}</strong></td>
     </tr>
  </table>
  <h3>Paid via ${sucessResponse.source.brand} card ending in ${
    sucessResponse.source.last4
  } on ${currentDateTime} <span style="float: right;">£ ${parseFloat(
    orgDetails.subscriptionAmount
  ).toFixed(2)}</span></h3>
  <br>
  <br>
  <br>
  <table style="width:100%">
     <tr>
        <td><strong><u>Issued to</u></strong><br>
           ${orgDetails.contactPerson} <br>
           ${orgDetails.email} <br>
           ${orgDetails.organizationName} <br>
           ${orgDetails.contactNumber} 
        </td>
        <td align="right"><strong><u>Issued by</u></strong><br>
           SiteMaster <br>
           digital@sitemaster.app <br>
           www.sitemaster.app<br>
           +447443727840
        </td>
     </tr>
  </table>`;
  return successEmailTemplate;
}

async function createFailureEmailTemplate(
  orgDetails,
  failureResponse,
  paymentUnique
) {
  const currentDateTime = new Date().toLocaleString("en-US", {
    timeZone: "Europe/London",
  });
  const failureEmailTemplate = `<h1 style="color: red; text-align: center;">-------FAILED-------</h1>
  <h1 style="text-align: center;"><u>${orgDetails.organizationName}</u></h1>
  <h2>Your monthly subscription has been failed.</h2>
  <p></h4>Failed attempt on ${currentDateTime} United Kingdom.</p>
  <br>
  <table style="width: 100%; border-bottom: 1px solid darkgrey">
     <tr>
        <td><strong>Monthly plan:</strong> </td>
        <td align="right"><strong>£ ${
          orgDetails.subscriptionAmount
        }</strong></td>
     </tr>
     <tr>
        <td><strong>Total: </strong></td>
        <td align="right"><strong>£ ${
          orgDetails.subscriptionAmount
        }</strong></td>
     </tr>
  </table>
  <p style="color: red;"><strong><u>Reason:</u></strong>&nbsp;&nbsp;&nbsp;${
    failureResponse.raw.message
  }</p>
  <p style="color: red;"><strong><u>Type:</u></strong>&nbsp;&nbsp;&nbsp;${
    failureResponse.type
  }</p>
  <p style="color: red;"><strong><u>ErrorResponse:</u></strong>&nbsp;&nbsp;&nbsp;${JSON.stringify(
    failureResponse
  )}</p>
  <table style="width: 100%;">
     <tr>
        <td><strong><u>Issued to</u></strong><br>
           ${orgDetails.contactPerson} <br>
           ${orgDetails.email} <br>
           ${orgDetails.organizationName} <br>
           ${orgDetails.contactNumber} 
        </td>
        <td align="right"><strong><u>Issued by</u></strong><br>
           SiteMaster <br>
           digital@sitemaster.app <br>
           www.sitemaster.app<br>
           +447443727840
        </td>
     </tr>
  </table>`;
  return failureEmailTemplate;
}

function createPaymentUnique() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month =
    currentDate.getMonth().toString().length == 1
      ? "0" + currentDate.getMonth()
      : currentDate.getMonth();
  const random = Math.floor(Math.random() * 100000000);
  return `SM${year}${month}-${random}`;
}
