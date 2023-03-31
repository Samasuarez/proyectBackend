const express = require("express");
const handlebars = require("express-handlebars");
const { Server } = require("https");
const ProductManager = require("./class/ProductManager");
const router = require("./routes");
const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public/js"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("views engine", "handlebars");
router(app);


 
const httpServer = app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
const io = new Server(httpServer)
io.on('conectio', async(socket)=>{
  const products = await ProductManager.getProducts()
  io.emit('realtimeproducts')
})