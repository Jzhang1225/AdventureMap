const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
//const cors = require("cors");

try {
  require("dotenv").config();
} catch (e) {
  console.log("On Heroku!");
}
module.exports = app;

//app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);
app.use("/public", express.static(path.join(__dirname, "../public")));

app.get("/googlemapsapikey", (req, res) => {
  res.send(process.env.GOOGLE_MAPS_API_KEY);
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
