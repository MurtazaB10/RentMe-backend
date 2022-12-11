const { User } = require("../models/User");
const { Verificationtoken } = require("../models/VerificationToken");
const jwt = require("jsonwebtoken");
const sendMail = require("../helper/sendMail");
const sendSms = require("../helper/sendSMS");

const {
  createAccessToken,
  createActivationToken,
  createRefreshToken,
  validateEmail,
  generateOtp,
} = require("../helper/helperFuncs");
const bcrypt = require("bcrypt");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { scope, username, phonenumber, email, password, address } =
        req.body;

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });
      const user = await User.findOne({ email });
      const user1 = await User.findOne({ phonenumber });

      if (user)
        return res.status(400).json({ msg: "This email already exists." });
      if (user1)
        return res
          .status(400)
          .json({ msg: "This phone number already exists." });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 chracters long." });

      const passwordHash = await bcrypt.hash(password, 12);
      const owner = {
        scope,
        username,
        phonenumber,
        email,
        address,
        password: passwordHash,
      };

      const otp1 = generateOtp();
      const otp2 = generateOtp();
      
        const newOtp = new Verificationtoken({
          owner,
          otp1,
          otp2,
        });
        await newOtp.save();
    
      sendMail(
        email,
        ` your Rentish verification token is <b>${otp1}</b>. Verify your email to register successfully. OTP will expire in 5 minutes.`,
        "verify your email"
      );

      sendSms(
        phonenumber,
        ` your Rentish verification token is <b>${otp2}</b>. Verify your mobile number to register successfully. It will expire in 5 minutes.`
      );

      res.json({
        msg: "Check your email and phonenumber for account activation.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  activateAccount: async (req, res) => {
    try {
      const { otp1, otp2 } = req.body;
      const token = await Verificationtoken.findOne({otp1, otp2});
      if (!token)
        return res.status(400).json({ msg: "Enter the correct otp." });
      console.log(token.owner);
      const newUser = new User({
        username: token.owner.username,
        email: token.owner.email,
        phonenumber: token.owner.phonenumber,
        address: token.owner.address,
        password: token.owner.password,
        scope: token.owner.scope
      });
      await newUser.save();
      await Verificationtoken.findOneAndDelete({otp1, otp2});
      return res.json({
        msg: "Account activated! proceed for login.",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Email or Password is incorrect." });

      return res.json({ msg: "Login success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCtrl;
