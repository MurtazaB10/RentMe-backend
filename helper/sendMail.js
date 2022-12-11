require("dotenv").config();
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_MAIL_ADDRESS,
  } = process.env;
  
  const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    // MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
  );
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

const sendEmail = (to, txt, sub) => {
    try {
        const accessToken = oauth2Client.getAccessToken();
        const smtpTransport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: SENDER_MAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken,
          },
        });
    
        const mailOptions = {
          from: SENDER_MAIL_ADDRESS,
          to: to,
          subject: sub,
          html: txt,
        };
    
        smtpTransport.sendMail(mailOptions, (err, info) => {
          if (err) console.log(err.message);
          return info;
        });
      } catch (error) {
        console.log(error.message);
      }
    };

module.exports = sendEmail;
