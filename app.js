require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

const {PORT, MONGODB_URI} = process.env;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


// add db model here later
//add db controllers here

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/equipment", (req, res) => {
  res.render("equipment");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});