const mongoose = require("mongoose");
const {dbAdmin, dbPassword,dbHost } = require('../src/config/db.config')
const mongoConect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbAdmin}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`
    );
    console.log("db conected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongoConect;
