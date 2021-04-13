const usercontroller = require("../controllers/user");
const authFbcontroller = require("../controllers/authFb");

module.exports.setup = function (app) {
  app.post("/api/user/create", usercontroller.addUser);

  app.post("/api/user/facebook_auth", authFbcontroller.facebookAuth);

  // app.post("/api/user/change", usercontroller.change_password);
  // app.post("/api/user/login", usercontroller.login);
  // app.post("/api/user/register", usercontroller.register);
};
