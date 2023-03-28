const { Router } = require("express");
const productManager = require("../class/productManager");
const router = Router();
const methodOverride = require("method-override");

const io = require("socket.io");
module.exports = (io) => {
  router.use(methodOverride("_method"));

  router.delete("/", (req, res) => {
    const productId = req.body.id;
    try {
      productManager.deleteProduct(parseInt(productId));
      res.status(200).redirect("back");
      io.emit("productos", productManager.getProducts());
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ error: `Error al eliminar el producto con id ${productId}` });
    }
  });

  router.post("/", (req, res) => {
    const { id, title, price, description, stock, code, category } = req.body;
    const status = req.body.status === "on";

    const product = {
      id: id,
      title: title,
      description: description,
      price: parseInt(price),
      stock: parseInt(stock),
      code: code,
      category: category,
      status: status,
      img: img,
    };

    try {
      productManager.addProduct(product);
      io.emit("productos", productManager.getProducts());
      res.status(201).redirect("back");
    } catch (error) {
      console.error(error);
      res.status(400).send({
        error: `error al crear el producto, verifica que sea un objeto y cuente con las claves y valores correctos`,
      });
    }
  });

  router.get("/", (req, res) => {
    const limite = parseInt(req.query.limit);
    try {
      const products = productManager.getProducts(limite);
      res.status(200).render("index.handlebars", { products });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: `error al cargar los productos` });
    }
  });

  router.get("/realTimeProducts", (req, res) => {
    const productsLimite = parseInt(req.query.limit);
    try {
      const productos = productManager.getProducts(productsLimite);

      io.emit("productos", productos);
      res.status(200).render("realTimeProducts.handlebars", { productos });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: `error al cargar los productos` });
    }
  });

  router.get("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);
    try {
      const product = productManager.getProductById(productId);
      res.status(200).send({ product });
    } catch (error) {
      console.error(error);
      res.status(404).send({ message: `producto ${productId} no encontrado` });
    }
  });

  router.patch("/:pid", (req, res) => {
    const productId = parseInt(req.params.pid);
    const updates = req.body;
    try {
      const updateProduct = productManager.updateProduct(productId, updates);
      io.emit("productos", productManager.getProducts());
      res.status(200).send({ updateProduct });
    } catch (error) {
      console.error(error);
      res.status(400).send({
        message: `error al actualizar ru producto, verifica los valores enviados por body`,
      });
    }
  });

  return router;
};
