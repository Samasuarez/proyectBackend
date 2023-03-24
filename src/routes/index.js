const  ProductsControl = require('../products/control.products')
const UsersControl = require('../users/control.users')
const router = (app) => {
  // funcion que controla todas las rutas
  app.use('/users', UsersControl )
  app.use("/products", ProductsControl);
};
module.exports = router;
