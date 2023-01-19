require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {PORT, MONGODB_URI} = process.env;

const RLE = require("./models/Equipment_loss");
const RLP = require("./models/Personnel_loss");
const eq_loss_Controller = require("./controllers/eq_loss_crud");
const per_loss_Controller = require("./controllers/per_loss_crud");

app.set("view engine", "ejs");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error("----------------MongoDB conncection error--------------------");
  console.error(err);
  process.exit();
})

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/equipment_losses", eq_loss_Controller.list);

app.get("/personnel_losses", per_loss_Controller.list);

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});