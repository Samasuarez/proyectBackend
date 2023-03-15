const express = require("express");
const CartRouter = require("./routes/cart.router");
const ProductRouter = require("./routes/products.router");

const port = 8080;

const app = express();

app.use(express.json());
app.use("/products", ProductRouter);
app.use("/cart", CartRouter);

app.use(express.static(__dirname + "/public"));

// app.get("/users", (req, res) => {
//   res.json({ message: users });
// });

// app.get("/users/:id", (req, res) => {
//   const { id } = req.params;

//   const user = users[id - 1];

//   res.send({ message: user });
// });

// app.post("/users", (req, res) => {
//   const { name } = req.body;

//   users.push(name);

//   res.status(201).json({ message: "Usuario creado" });
// });
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
