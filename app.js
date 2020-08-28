const express = require("express");
const ejs = require("ejs");
const app = express();
const config = require("config");
const request = require("superagent");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public/"));
app.use(express.json());
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/notifyme", function (req, res) {
  request
    .post(
      "https://" +
        config.get("mailchimpInstance") +
        ".api.mailchimp.com/3.0/lists/" +
        config.get("listID") +
        "/members/"
    )
    .set("Content-Type", "application/json;charset=utf-8")
    .set(
      "Authorization",
      "Basic " +
        new Buffer("any:" + config.get("mailchimpApiKey")).toString("base64")
    )
    .send({
      email_address: req.body.email,
      status: "subscribed",
    })
    .end(function (err, response) {
      if (
        response.status < 300 ||
        (response.status === 400 && response.body.title === "Member Exists")
      ) {
        res.send("Signed Up!");
      } else {
        res.send("Sign Up Failed :(");
        console.error(err.message);
      }
    });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
