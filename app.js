const express = require("express");
const logsController = require("./controllers/logsController");
const logs = require("./models/log")

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to the captain's log");
});

app.use("/logs", logsController);

app.get("/logs/:arrayIndex", (req, res) => {
  const { arrayIndex } = req.params;
  if (logs[arrayIndex]) {
    res.json(logs[arrayIndex]);
  } else {
    res.status(300).send("Page Not Found!");
  }
});

//Bonus:
// app.get("/logs/:lastCrisis", (req, res) => {
//     const { lastCrisis } = req.query;
// if(lastCrisis > 10 ){

// }
// })

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found!");
});

module.exports = app;
