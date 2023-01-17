const mongoose = require("mongoose");
const { Schema } = mongoose;

const equipment_lossSchema = new Schema({

date: String,
day: String,
aircraft: String,
helicopter: String,
tank: String,
APC: String,
"field artillery": String,
MRL: String,
"military auto": String,
"fuel tank": String,
drone: String,
"naval ship": String,
"anti-aircraft warfare": String

}, 
    
{timestamp: true}
);

module.exports = mongoose.model("russia_losses_equipment", equipment_lossSchema);