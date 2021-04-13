const User = require("../models/user");
var mongoose = require("mongoose");
const mongo = require("mongodb");
exports.facebookAuth = (req, res, next) => {
  try {
    console.log("test" + req.body.id);
    User.findOne({ facebook_id: req.body.id }).then((user) => {
      // user = users[0];

      if (!user) {
        var user = new User({
          facebook_id: req.body.id,
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
    });
  } catch (error) {
    return next(error);
  }
};
