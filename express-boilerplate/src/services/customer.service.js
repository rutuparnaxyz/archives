const axios = require('axios');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK = require('../../config/common.config').FACEBOOK_KEYS;
const GOOGLE = require('../../config/common.config').GOOGLE_KEYS;
const config = require('../../config/common.config');

const options = require('../utils/bigcommerce')
const Customer = require('../db/sequelize').customer;
const Otp = require('../db/sequelize').otp;
const CustomerToken = require('../db/sequelize').customerToken;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Customer.findById(id).then((customer) => {
        done(null, customer);
    });
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE.CLIENT_ID,
    clientSecret: GOOGLE.CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
}, async (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    const currentCustomer = await Customer.findOne({ where: { google_id: profile.id } });
    if (currentCustomer) {
        console.log('Customer is: ', currentCustomer);
        done(null, currentCustomer);
    } else {
        const customer = {
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value
        }
        const cust = await createCustomer(customer);
        const newCustomer = await Customer.create({
            google_id: profile.id,
            customer_id: cust.data[0].id
        })
        console.log("Created new customer", newCustomer);
        done(null, newCustomer)
    }
})
);

passport.use(new FacebookStrategy({
    clientID: FACEBOOK.CLIENT_ID,
    clientSecret: FACEBOOK.CLIENT_SECRET,
    callbackURL: '/auth/google/redirect'
}, async (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    const currentCustomer = await Customer.findOne({ where: { google_id: profile.id } });
    if (currentCustomer) {
        console.log('Customer is: ', currentCustomer);
        done(null, currentCustomer);
    } else {
        const customer = {
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: 'dggd@gmail.com' //profile.emails[0].value
        }
        const cust = await createCustomer(customer);
        const newCustomer = await Customer.create({
            google_id: profile.id,
            customer_id: cust.data[0].id
        })
        console.log("Created new customer", newCustomer);
        done(null, newCustomer)
    }
})
);

async function contactLogin(customerBody) {
    const currentDate = new Date();
    const otpObj = await Otp.findOne({ where: { contact_number: customerBody.contact_number, otp: customerBody.otp, is_verified: false } });
    const otpVerified = otpObj && !otpObj.is_verified && currentDate < otpObj.expiry_date;
    if (!otpVerified) {
        throw new Error('Otp verification failed.')
    }
    try {
        const customer = await Customer.findOne({ where: { contact_number: customerBody.contact_number } })
        if (!customer) {
            throw new Error('You are not registered.')
        }
        otpObj.update({ is_verified: true });
        const customerObj = await getCustomer(customer.customer_id);
        const token = jwt.sign({ id: customer.customer_id }, config.JWT_SECRET)
        await CustomerToken.create({ token: token, customerId: customer.id });
        const customerObject = customerObj.data
        return { customerObject, token };

    } catch (error) {
        throw new Error(error.message);
    }
}

async function contactRegister(customerBody) {
    const currentDate = new Date();
    const otpObj = await Otp.findOne({ where: { contact_number: customerBody.contact_number, otp: customerBody.otp, is_verified: false } });
    const otpVerified = otpObj && !otpObj.is_verified && currentDate < otpObj.expiry_date;
    if (!otpVerified) {
        throw new Error('Otp verification failed.')
    }
    try {
        const { otp, contact_number, ...customer } = customerBody;
        customer.phone = (customerBody.contact_number).toString();
        const cust = await createCustomer(customer);
        const newCustomer = await Customer.create({
            customer_id: cust.data[0].id,
            contact_number: customerBody.contact_number,
            email: customerBody.email
        });
        otpObj.update({ is_verified: true });
        if (!newCustomer) {
            throw new Error('Unable to register.');
        }
        const token = jwt.sign({ id: newCustomer.id }, config.JWT_SECRET)
        await CustomerToken.create({ token: token, customerId: newCustomer.id });
        const customerObject = cust.data[0]
        return { customerObject, token };

    } catch (error) {
        throw new Error(error.message);
    }
}

async function generateOtp(requestBody) {
    const isRegistered = await Customer.findOne({ where: { contact_number: requestBody.contact_number } })

    if (requestBody.type == 'login' && !isRegistered) {
        throw new Error('You are not registered. Please register to continue.')
    }
    if (requestBody.type == 'register'&& requestBody.email && isRegistered && isRegistered.email == requestBody.email) {
        throw new Error('You are already registered. Please login to continue.')
    }
    const currentDate = new Date();
    const otpRecord = {
        otp: 123456,    //Math.floor(100000 + Math.random() * 900000),
        contact_number: requestBody.contact_number,
        expiry_date: currentDate.setMinutes(currentDate.getMinutes() + 10),
    }
    try {
        const otpObj = await Otp.create(otpRecord);
        return otpObj;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function logoutCustomer(token) {
    try {
        const tokenObj = await CustomerToken.findOne({ where: { token: token } })
        tokenObj.update({ is_active: false });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function createCustomer(customerBody) {
    try {
        const customer = await axios.post('https://api.bigcommerce.com/stores/2acctzivgs/v3/customers', JSON.stringify([customerBody]), options)
        return customer.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getCustomer(customerId) {
    try {
        const customer = await axios.get('https://api.bigcommerce.com/stores/2acctzivgs/v2/customers/' + customerId, options);
        return customer;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    contactLogin,
    generateOtp,
    contactRegister,
    logoutCustomer
}