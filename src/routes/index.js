const ProductsControl = require("../products/control.products");
const RealTimeProductsControl = require("../realTimeProd/control.RealTimeProd");
// const UsersControl = require('../users/control.users')
const router = (app) => {
  app.use("/products", ProductsControl);
  app.use("/realTimeProducts", RealTimeProductsControl);
  // app.use('/users', UsersControl )
};
module.exports = router;
