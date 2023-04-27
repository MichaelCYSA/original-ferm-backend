const express = require("express");
const app = express();
const path = require("path");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const cors = require('cors');
const config = require("./config.json");

const PORT = config.PORT;
const mongoUri = config.MongoUri;

app.use(cors({}));
app.use(express.static("public"));
app.use(express.json({ extended: true }));
app.use(fileUpload());

const start = async () => {
  try {
    await mongoose
      .connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((res) => console.log("mongo is started!"));

    app.listen(PORT, () => {
      console.log(`Server is running on the PORT: ${PORT}!`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();

app.get("/", function (_, res, next) {
  res.sendFile(path.join(__dirname, "/app/templates/index.html"));
});
app.get("/img/:name", function (req, res, next) {
  const name = req.params.name
  res.sendFile(path.join(__dirname, `/public/images/${name}`));
});

app.use("/api", require("./app/router"));

module.exports = app;
