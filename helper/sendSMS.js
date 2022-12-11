require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSms = (to, text) => {
  client.messages
    .create({ body: text, from: "+18087363722", to: "+91" + to })
    .then((message) => console.log(message.sid))
    .catch((e) => {
      console.log(e.message);
    });
};

module.exports = sendSms;
