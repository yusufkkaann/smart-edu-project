const session = require("express-session");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // req.body.email ve req.body.password
    if (!email || !password) {
      // eğer email veya password yoksa hata mesajı döndür
      return res.status(400).json({
        status: "fail",
        message: "email and password are required",
      });
    }
    const user = await User.findOne({ email }); // email ile user ara
    if (!user) {
      // eğer user yoksa hata mesajı döndür
      return res.status(400).json({
        status: "fail",
        message: "user not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password); //  bcrypt.compare(password, user.password) => true or false
    if (!isMatch) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect password",
      });
    }
    req.session.userID = user._id; // session oluştur
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Server error",
      error: error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => {
    // session'ı sil
    res.redirect("/");
  });
};
exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  if (!req.session.userID) {
    return res.redirect("/login");
  }
  res.status(200).render("dashboard", { page_name: "dashboard", user });
};
