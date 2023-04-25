
const ROUTER = require('express');
const router = new ROUTER();
const Auth = require('./services/auth');
const ProductService = require('./services/product');
const AuthCheck = require('./middlewares/auth.middleware')
const ProductValidation = require('./validationMiddlewares/product');
const Files = require('./services/files');

router.post('/register', Auth.registration);
router.post('/login' ,  Auth.login);
router.post('/product', AuthCheck ,  ProductValidation ,  ProductService.addProduct)
router.patch('/product/:id' , AuthCheck,   ProductService.updateProductById)
router.delete('/product/:id' , AuthCheck,  ProductService.deleteProductById)
router.get('/product' ,  ProductService.getAllProducts)
router.get('/product/:id', AuthCheck ,  ProductService.getAllProductById)

router.post('/uploadImage', AuthCheck ,  Files.uploadFile)
router.post('/deleteImage', AuthCheck ,  Files.deleteImage)
router.get('/check' , Files.test)

module.exports = router;