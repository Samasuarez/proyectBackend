const ProductManager = require("./class/ProductManager");
const app = require("./app");
const {port}=require('./config/app.confing')
const { Server } = require("https");


const httpServer = app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
const io = new Server(httpServer);
io.on("conection", async (socket) => {
  const products = await ProductManager.getProducts();
  io.emit("realtimeproducts", { products });
});
