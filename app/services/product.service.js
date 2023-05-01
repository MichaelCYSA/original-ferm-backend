const Product = require("../models/product");
const ServiceErrorHandler = require("../@lib/serviceErrorHandler");

class ProductService {
  addProduct = ServiceErrorHandler(async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    await newProduct.save();
    return res.status(201).json({ message: "Product created!" });
  });

  updateProductById = ServiceErrorHandler(async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const product = await Product.findById(id);

    if (!product) {
      throw new Error({
        status: 400,
        message: "Not found product!",
      });
    }

    await Product.updateOne({ _id: id }, updates);

    return res.json({ message: "Product updated successfully!" });
  });

  deleteProductById = ServiceErrorHandler(async (req, res) => {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      throw new Error({
        status: 404,
        message: "Not found !",
      });
    }

    await Product.deleteOne({ _id: id });

    return res.json({ message: "Product deleted successfully!" });
  });
  getAllProducts = ServiceErrorHandler(async (req, res) => {
    const productType = req.params.type;
    const data = await Product.find({productType});
    return res.status(200).json({ message: "Products was gotten!", data });
  });
  getAllProductById = ServiceErrorHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      throw new Error({
        status: 400,
        message: "Not found product!",
      });
    }
    return res.status(200).json({ message: "Product was gotten!", product });
  });
}
module.exports = new ProductService();
