const mongoose = require("mongoose");
const { Schema } = mongoose;

const personnel_lossSchema = new Schema({
    date: String,
    day: String,
    personnel: String,
    "personnel*": String,
    POW: String
}, 
    {timestamp: false}
);

module.exports = mongoose.model("russia_losses_personnel", personnel_lossSchema);