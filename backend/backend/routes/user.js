
const usercontroller = require("../controllers/user");

module.exports.setup = function (app) {


    app.post('/api/user/create', usercontroller.addUser);

}
