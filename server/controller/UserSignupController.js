import User from "../model/userModel.js";
import speakeasy from "speakeasy";
import nodemailer from "nodemailer";
import { config } from "dotenv";
config();

const AdminEmail = process.env.AdminEmail;
const AdminPassword = process.env.AdminPassword;

const users = {};
let _name, _password, _email;

const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    _name = name;
    _password = password;
    _email = email;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const secret = speakeasy.generateSecret({
      length: 4,
      name: "Node-Mail-Service",
      symbols: false,
    });

    users[email] = {
      secret: secret.base32,
      encoding: "base32",
      verified: false,
    };

    const otp = speakeasy.totp({
      secret: users[email].secret.base32,
      encoding: "base32",
    });

    await sendOTPEmail(email, otp);

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: AdminEmail,
      pass: AdminPassword,
    },
  });

  const mailOptions = {
    from: "er.rajeev.mca@gmail.com",
    to: email,
    subject: "OTP Verification",
    text: `Hello ${_name},
    We're excited to welcome you to the CityWide Shopping To ensure the security of your account, please use the following one-time verification code:
    
    🌟 Your Exclusive Code: ${otp}
    
    Simply enter this code during the verification process, and you'll be all set to explore the exciting world of CityWide.
    
    Thank you for choosing CityWide.
    
    Best regards,
    Rajeev Ranjan`,
  };

  return transporter.sendMail(mailOptions);
};

const otpVerification = async (req, res) => {
  try {
    const { email, token } = req.body;

    const user = users[email];
    if (!user) {
      return res.status(404).json({ error: "User Profile not found !!" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.secret.base32,
      encoding: "base32",
      token,
      window: 2,
    });

    if (verified) {
      user.verified = true;
      try {
        await User.create({
          name: _name,
          email: _email,
          password: _password,
        });
        res
          .status(200)
          .json({ message: `OTP verification successful. ${_name} Added!` });
      } catch (error) {
        res.status(500).json({ error: "Can't Create Account" });
      }
    } else {
      res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error during verification" });
  }
};

export { Signup, otpVerification };
