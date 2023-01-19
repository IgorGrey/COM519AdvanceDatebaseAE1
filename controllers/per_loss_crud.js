const bodyParser = require("body-parser");
const Personnel_Loss = require("../models/Personnel_loss");

exports.list = async (req, res) => {
  const perPage = 8;
  const limit = parseInt(req.query.limit) || 8; 
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;

  try {
    const Personnel_losses = await Personnel_Loss.find({}).skip((perPage * page) - perPage).limit(limit);
    const count = await Personnel_loss.find({}).count();
    const numberOfPages = Math.ceil(count / perPage);
    
    res.render("personnel_losses", {
      Personnel_losses: Personnel_losses,
      numberOfPages: numberOfPages,
      currentPage: page,
      message: message
    });
  } catch (e) {
    res.status(404).send ({ message: "Could not find equipment "})
  }
};

exports.create = async (req, res) => {
  try {
    await Personnel_Loss.create({
      date: req.body.date,
      day: req.body.day,
      personnel: req.body.personnel,
      personnelA: req.body.personnelA,
      POW: req.body.POW
    });
    res.redirect('personnel_losses/?message=New entry to personnel losses has been recorded.');
  } catch (e){
    if (e.errors) {
      res.render('create', { errors: e.errors })
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
    const result = await Personnel_Loss.findById(_id);

    if (!result) throw Error('cant find record');
    res.render('update', { result, result });
  } catch (e) {
    if (e.errors) {
      res.render('personnel_losses', { errors: e.errors })
      return;
    }
    res.status(404).send({
      message: `No record found with ${-id}`});
  }
};

exports.editView = async(req, res) => {
  try {
    await Personnel_Loss.updateOne({
        date: req.body.date,
        day: req.body.day,
        personnel: req.body.personnel,
        personnelA: req.body.personnelA,
        POW: req.body.POW
    })
    res.redirect("/personnel_losses");
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
  res.redirect("/personnel_losses");
  } catch (e) {
    res.status(404).send({
      message: `Deletion failed for record ${_id}.`
    });
  }
};