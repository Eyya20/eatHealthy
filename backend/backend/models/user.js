const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  id: String,
  facebook_id: String,
  givenName: String,
  familyName: String,
  photo: String, // url
  name: String, // full name
  username: String,
  password: String,
});

module.exports = mongoose.model("user", UserSchema);
