const express = require("express");
const app = express();
const mongoose = require("mongoose");

const users = require("./routes/user");
app.use(express.json());

const mongoUri =
  "mongodb+srv://eya:0000@cluster0.corvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
users.setup(app);

mongoose.connection.on("connected", () => {
  console.log("connected to mongo ");
});
mongoose.connection.on("error", (err) => {
  console.log("error", err);
});
app.get("/", (req, res) => {
  res.send("welcome to node.js");
});

app.listen(3000, () => {
  console.log("server running");
});
