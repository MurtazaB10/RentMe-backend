const { Retailer } = require("../models/Retailer");
const jwt = require("jsonwebtoken");
const sendMail = require("../helper/sendMail");
const bcrypt = require("bcrypt");
const {
  createAccessToken,
  createActivationToken,
  createRefreshToken,
  validateEmail,
} = require("../helper/helperFuncs");

const retailerCtrl = {
  register: async (req, res) => {
    try {
      const { shopname, username, phonenumber, email, password, address } =
        req.body;

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });
      const retailer = await Retailer.findOne({ email });

      if (retailer)
        return res.status(400).json({ msg: "This email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 chracters long." });

      const passwordHash = await bcrypt.hash(password, 12);
      const newRetailer = new Retailer({
        shopname,
        username,
        address,
        phonenumber: { value: phonenumber, isVer: false },
        email: { value: email, isVer: false },
        password: passwordHash,
      });
      await newRetailer.save();
      res.json({
        msg: "Register Success!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = retailerCtrl;
