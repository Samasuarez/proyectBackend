const express = require("express");
const handlebars = require("express-handlebars");
const router = require("./routes");
const mongoConect = require("../db");
const app = express() 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public/js"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("views engine", "handlebars");
router(app);
mongoConect()
module.exports = app