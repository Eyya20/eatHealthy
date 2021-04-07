const User = require("../models/user");
var mongoose = require("mongoose");
const mongo = require("mongodb");

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
