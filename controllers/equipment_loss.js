const Equipment_loss = require("../models/Equipment_loss");

exports.list = async (req, res) => {
  const perPage = 10;
  const limit = parseInt(req.query.limit) || 10; 
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;

  try {
    const equipment_loss = await Equipment_loss.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Equipment_loss.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);
    console.log("_________all equipment should be losted below to test db conncection and model import--------------------") // remove this before submition
    console.log(equipment_loss); // remove this before submition
    
    res.render("equipment_loss", {
      Equipment_losses: Equipment_losses,
      numberOfPages: numberOfPages,
      currentPage: page,
      message: message
    });
  } catch (e) {
    res.status(404).send ({ message: "could not find equipment "})
  }
}