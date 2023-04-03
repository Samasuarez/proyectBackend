const { Router } = require("express");
const ProductManager = require("../class/ProductManager");
const router = Router();
const path = require('path')
const productManager= new ProductManager(
  path.join(__dirname  ,'../files/products.json')
)

router.get("/", (req, res) => {
    const productsLimite = parseInt(req.query.limit);
    try {
      const productos = productManager.getProducts(productsLimite);

      // io.emit("productos", productos);
      res.status(200).render("realTimeProd.handlebars");
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: `error al cargar los productos` });
    }
  });
  module.exports = router