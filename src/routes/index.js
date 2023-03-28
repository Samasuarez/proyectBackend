const  ProductsControl = require('../products/control.products')
// const UsersControl = require('../users/control.users')
const router = (app) => {

  app.use("/products", ProductsControl);
  // app.use('/users', UsersControl )
};
module.exports = router;
