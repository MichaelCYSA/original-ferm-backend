const ROUTER = require("express");
const router = new ROUTER();
const Auth = require("../services/auth.service");
const ProductService = require("../services/product.service");

const Files = require("../services/files.service");
const OrderService = require("../services/order.service");

const validationMiddleware = require("../middlewares/validation.middleware");
const AuthCheck = require("../middlewares/auth.middleware");
const productScheme = require("../validation/product.scheme");
const orderScheme = require("../validation/order.scheme");
const updateOrderScheme = require("../validation/updateOrder.scheme");
const updatePasswordScheme = require("../validation/updatePassword.scheme");

router.post("/register", AuthCheck, Auth.registration);
router.post("/login", Auth.login);
router.patch(
  "/password",
  AuthCheck,
  validationMiddleware(updatePasswordScheme),
  Auth.changePassword
);

router.post(
  "/product",
  AuthCheck,
  validationMiddleware(productScheme),
  ProductService.addProduct
);
router.patch("/product/:id", AuthCheck, ProductService.updateProductById);
router.delete("/product/:id", AuthCheck, ProductService.deleteProductById);
router.get("/product/:type", ProductService.getAllProducts);
router.get("/product/:id", AuthCheck, ProductService.getAllProductById);

router.post("/uploadImage", Files.uploadFile);
router.post("/deleteImage", AuthCheck, Files.deleteImage);

router.post("/order", validationMiddleware(orderScheme), OrderService.newOrder);
router.patch(
  "/order/:id",
  validationMiddleware(updateOrderScheme),
  AuthCheck,
  OrderService.updateOrder
);
router.delete("/order/:id", AuthCheck, OrderService.deleteOrderById);
router.get("/order", AuthCheck, OrderService.getAllOrders);
router.get("/order/:id", AuthCheck, OrderService.getOrderById);

module.exports = router;
