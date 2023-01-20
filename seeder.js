require("dotenv").config();
const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const Rlp = require("./models/Personnel_loss");
const Rle = require("./models/Equipment_loss");

const { MONGODB_URI, MONGODB__PRODUCTION_URI } = process.env;

const client = new MongoClient(
  process.env.NODE_ENV === "production" ? MONGODB__PRODUCTION_URI : MONGODB_URI
);

async function main() {
    try {
        const equipment_results = await Rle.find({}).count();
        const perosonnel_results = await Rlp.find({}).count();
        if(equipment_results || perosonnel_results) {
            db.dropDatabase();
        }
        const laod = loading("loading data ...").start();
        const equipment_data = await fs.readFile(path.join(__dirname, "eq.json"), "utf8");
        const personnel_data = await fs.readFile(path.join(__dirname, " per.json"), "utf8");
        await Rle.insertMany(JSON.parse(equipment_data));
        await Rlp.insertMany(JSON.parse(personnel_data));

        load.stop();
        console.info('Data loaded!');
        process.exit();

    } catch {
        console.error("error:", error);
        process.exit();
    }
}

main();