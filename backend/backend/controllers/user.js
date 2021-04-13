const User = require("../models/user");
var mongoose = require("mongoose");
const mongo = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
axios = require("axios");
/* const JWT_SECRET = "zDqzHrfOm/62S6iH"; */
exports.addUser = (req, res, next) => {
  try {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.json({
          message: "Email already exists",
          data: user,
        });
      } else {
        const newUser = new User({
          email: req.body.email,
          name: req.body.name,
          photo: req.body.photo,
        });
        newUser.save().then((result) =>
          res.json({
            status: "success",
            message: "user successfully added",
            data: result,
          })
        );
      }
    });
  } catch (e) {
    res.json({ error: e });
  }
};
exports.facebookAuth = (req, res, next) => {
  try {
    console.log("test" + response.data.id);
    User.find(
      { facebook_id: response.data.id }.then((user) => {
        user = users[0];

        if (!user) {
          var user = new User({
            facebook_id: facebook_id,
            email: req.body.email,
            name: req.body.name,
          });
          user.save().then((result) =>
            res.json({
              status: "success",
              message: "user successfully added",
              data: result,
            })
          );
        } else {
          res.json({ data: user });
        }
      })
    );
  } catch (error) {
    return next(error);
  }
};

exports.change_password = async (req, res) => {
  const { token, newpassword: plainTextPassword } = req.body;

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);

    const _id = user.id;

    const password = await bcrypt.hash(plainTextPassword, 10);

    await User.updateOne(
      { _id },
      {
        $set: { password },
      }
    );
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: ";))" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }

  if (await bcrypt.compare(password, user.password)) {
    // the username, password combination is successful

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", data: token });
  }

  res.json({ status: "error", error: "Invalid username/password" });
};

exports.register = async (req, res) => {
  const { username, password: plainTextPassword } = req.body;

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username,
      password,
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
};
