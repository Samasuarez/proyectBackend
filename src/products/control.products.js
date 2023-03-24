const { Router } = require("express");
const dataProducts = require("../files/products.json");

const router = Router();

router.get("/", (req, res) => {
  res.json(dataProducts);
});

router.get("/:pid", (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const producto = dataProducts[id - 1];
  res.send({ message: producto });
});

router.get("/products/:pid", (req, res) => {
  const id = parseInt(req.params.id);
  const producto = dataProducts.find((p) => p.id === id);

  if (producto) {
    res.json(producto);
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
});

router.post("/", (req, res) => {
  const { id, title, description, code, price, Status, stock, category } =
    req.body;

  const newProductInfo = {
    id,
    title,
    description,
    code,
    price,
    Status,
    stock,
    category,
  };
  dataProducts.productos.push(newProductInfo);
  res.status(201).json({ message: "Product creado" });
});
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  products.splice(id - 1, 1);
  products = products.filter((product, index) => index !== id);
});
module.exports = router;
