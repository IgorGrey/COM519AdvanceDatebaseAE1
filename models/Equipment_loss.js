const mongoose = require("mongoose");
const { Schema } = mongoose;

const equipment_lossSchema = new Schema({
date: String,
day: String,
aircraft: String,
helicopter: String,
tank: String,
APC: String,
field_artillery: String,
MRL: String,
military_auto: String,
fuel_tank: String,
drone: String,
naval_ship: String,
anti_aircraft_warfare: String
},     
{timestamp: true}
);

module.exports = mongoose.model("russia_losses_equipment", equipment_lossSchema);