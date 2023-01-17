require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const equipment_lossController = require("./controllers/Equipment_loss");
const personnel_lossController = require("./controllers/Personnel_loss");

const {PORT, MONGODB_URI} = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

mongoose.connection.on("error", (err) => {
  console.error("----------------MongoDB conncection error--------------------");
  console.error(err);
  process.exit();
})
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//add db controllers here -----------------------------

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/equipment_losses", async (req, res) => {
  const equipment_losses = await equipment_lossController.find({})
  res.render("equipment_losses");
});

app.get("/personnel_losses", async (req, res) => {
  const personnel_losses = await personnel_lossController.find({})
  res.render("personnel_losses");
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});