const mongoose = require("mongoose");
// const {dbAdmin, dbPassword,dbHost } = require('../src/config/db.config')s
const mongoConect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://paknais01:admin@cluster0.u2zhjog.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("db conected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongoConect;
// mongodb+srv://paknais01:<password>@cluster0.u2zhjog.mongodb.net/?retryWrites=true&w=majority