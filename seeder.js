require("dotenv").config();
const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");
const Rlp = require("./models/Personnel_loss");
const Rle = require("./models/Equipment_loss");
const { MONGODB_URI, MONGODB_PRODUCTION_URI } = process.env;

const client = new MongoClient(
  process.env.NODE_ENV === "production" ? MONGODB_PRODUCTION_URI : MONGODB_URI
);

async function main() {
  
}