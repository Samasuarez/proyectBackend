const { Router } = require("express");
const router = Router();
let products = [];
router.get("/", (req, res) => {
  res.json({ message: products });
});
router.post("/", (req, res) => {
  const { name, price } = req.body;

  const newProductInfo = {
    name,
    price,
  };
  products.push(newProductInfo);
  res.status(201).json({ message: "Product creado" });
});
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  products.splice(id - 1, 1);
  products = products.filter((product, index) => index !== id);
});
module.exports = router;
