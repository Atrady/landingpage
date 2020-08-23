const express = require("express");
const ejs = require("ejs");
const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public/"));

app.get("/", (req, res) => {
  res.render("index");
});
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
