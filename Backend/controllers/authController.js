const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  createUser: async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET
        ).toString(),
      });

      await newUser.save();
      res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu" });
    } catch (error) {
      console.error("User creation error:", error.message);
      res
        .status(500)
        .json({
          message: "Kullanıcı oluşturulurken bir hata oluştu",
          error: error.message,
        });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json("Yanlış email");
      }

      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET
      );
      const decryptedpass = decryptedPassword.toString(CryptoJS.enc.Utf8);

      if (decryptedpass !== req.body.password) {
        return res.status(401).json("Yanlış şifre");
      }

      const userToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SEC,
        { expiresIn: "7d" }
      );

      const { password, __v, createdAt, updateAt, ...userData } = user._doc;
      res.status(200).json({ ...userData, token: userToken });
    } catch (error) {
      res.status(500).json({ message: "Giriş yapılırken bir hata oluştu" });
    }
  },
};
