const express = require("express");
const app = express();
const sgMail = require("@sendgrid/mail");
const { PubSub } = require("@google-cloud/pubsub");
const pubSubClient = new PubSub({
  projectId: "sitemaster-dev",
  keyFilename: "pubsub.json",
});
const subscriptionName = "email_sub";
const timeout = 60;

// Test API for cloud function.
app.get("/", (req, res) => {
  let message = req.query.message || req.body.message || "Boooom!!!";
  res.status(200).send(message);
});

// Calling the handler.
listenForPullMessages(pubSubClient, subscriptionName, timeout);

async function listenForPullMessages(pubSubClient, subscriptionName, timeout) {
  const subscription = pubSubClient.subscription(subscriptionName);
  let messageCount = 0;
  const messageHandler = (message) => {
    // Convert to string and parsethe message(objectBody).
    const messageObj = Buffer.from(message.data, "base64").toString("utf-8");
    let parsedMessage = JSON.parse(messageObj);

    sgMail.setApiKey(
      "SG.*****************************************************************"
    );

    // Create the email object.
    const msg = {
      to: [parsedMessage.toEmail],
      from: "digital@sitemaster.app",
      subject: parsedMessage.subject,
      text: parsedMessage.text,
      html: parsedMessage.html + "ddd",
    };

    sgMail
      .sendMultiple(msg)
      .then(() => {
        console.log("Email Sent!!!");
      })
      .catch((error) => {
        console.log(error);
      });
    messageCount += 1;

    // Ack received message.
    message.ack();
  };

  subscription.on("message", messageHandler);

  setTimeout(() => {
    subscription.removeListener("message", messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

app.listen(4444, () => {
  console.log("Subscriber is up and running on port 4444!!!");
});
