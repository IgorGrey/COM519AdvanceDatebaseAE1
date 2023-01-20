const Equipment_Loss = require('../models/Equipment_loss');
const bodyParser = require("body-parser");

exports.list = async (req, res) => {
  const perPage = 12;
  const limit = parseInt(req.query.limit) || 12; 
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;

  try {
    const Equipment_losses = await Equipment_Loss.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Equipment_Loss.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);
    
    res.render("equipment_losses", {
      Equipment_losses: Equipment_losses,
      numberOfPages: numberOfPages,
      currentPage: page,
      message: message
    });
  } catch (e) {
    res.status(404).send ({ message: "Could not find equipment loss data"})
  }
};

exports.create = async (req, res) => {
  try {
    await Equipment_Loss.create({
      date: req.body.date,
      day: req.body.day,
      aircraft: req.body.aircraft,
      helicopter: req.body.helicopter,
      tank: req.body.tank,
      APC: req.body.apc,
      field_artillery: req.body.field_artillery,
      MLR: req.body.mlr,
      miliray_auto: req.body.miliray_auto,
      fuel_tank: req.body.fuel_tank,
      drone: req.body.drone,
      naval_ship: req.body.naval_ship,
      anti_aircraft_warfare: req.body.anti_aircraft_warfare
    });
    res.redirect('equipent_losses/?message=New entry to equipment losses has been recorded.');
  } catch (e){
    if (e.errors) {
      res.render('create_e', { errors: e.errors })
      rerturn;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}

exports.edit = async (req, res) => {
  const _id = req.params["id"];

  try {
    const result = await Equipment_Loss.findById(_id);

    if (!result) throw Error('cant find record');
    res.render('update', { result, result });
  } catch (e) {
    if (e.errors) {
      res.render('equipmeent_losses', { errors: e.errors })
      return;
    }
    res.status(404).send({
      message: `No record found with ${-id}`});
  }
};

exports.editView = async(req, res) => {
  try {
    await Equipment_Loss.updateOne({
      date: req.body.date,
      day: req.body.day,
      aircraft: req.body.aircraft,
      helicopter: req.body.helicopter,
      tank: req.body.tank,
      APC: req.body.apc,
      field_artillery: req.body.field_artillery,
      MLR: req.body.mlr,
      miliray_auto: req.body.miliray_auto,
      fuel_tank: req.body.fuel_tank,
      drone: req.body.drone,
      naval_ship: req.body.naval_ship,
      anti_aircraft_warfare: req.body.anti_aircraft_warfare
    })
    res.redirect("/equipment_losses");
  } catch (e) {
    res.status(404).send({
      message: `Update failed.`
    });
  }
};

exports.delete = async (req,res) => {
  const _id = req.params._id;
  try{
    await Equipment_Loss.findByIdAndRemove(_id);
  res.redirect("/equipment_losses");
  } catch (e) {
    res.status(404).send({
      message: `Deletion failed for record ${_id}.`
    });
  }
};