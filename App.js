const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter.js");
app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Page not found" });
});

module.exports = app;
