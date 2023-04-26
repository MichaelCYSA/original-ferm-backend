const Order = require("../models/order");
const Product = require("../models/product");
const ServiceErrorHandler = require("../@lib/serviceErrorHandler");

const countAndReturnAllSelectedProducts = async (productIds = []) => {
  const products = await Product.find({ _id: { $in: productIds } });
  const totalPrice = products.reduce((total, product) => {
    return total + product.price;
  }, 0);

  return [totalPrice, products.map((product) => product.id)];
};

class OrderService {
  newOrder = ServiceErrorHandler(async (req, res) => {
    const order = req.body;

    if (!order.products?.lenght) {
      throw new Error({
        status: 400,
        message: "Not found selected products !",
      });
    }

    const [totalPrice, products] = countAndReturnAllSelectedProducts(
      order.products
    );

    const newOrder = new Order({ ...order, totalPrice, products });
    await newOrder.save(order);
    return res.status(201).json({ message: "Order created!" });
  });

  updateOrder = ServiceErrorHandler(async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const [totalPrice, products] = countAndReturnAllSelectedProducts(
      updates.products
    );

    if (products?.lenght) {
      updates.totalPrice = totalPrice;
      updates.products = products;
    }

    const order = await Order.findById(id);

    if (!order) {
      throw new Error({
        status: 400,
        message: "Not found order!",
      });
    }

    await Order.updateOne({ _id: id }, updates);

    return res.json({ message: "Order updated successfully!" });
  });

  deleteOrderById = ServiceErrorHandler(async (req, res) => {
    const id = req.params.id;

    const order = await Order.findById(id);

    if (!order) {
      throw new Error({
        status: 400,
        message: "Not found order!",
      });
    }

    await Order.deleteOne({ _id: id });

    return res.json({ message: "Order deleted successfully!" });
  });

  getAllOrders = ServiceErrorHandler(async (req, res) => {
    const { skip = 0, take = 10, status, fromDate, toDate } = req.query;

    let query = Order.find({ status });
    let countQuery = Order.countDocuments({ status });

    if (fromDate && toDate) {
      countQuery = countQuery.where("createdAt").gte(fromDate).lte(toDate);
      query = query.where("createdAt").gte(fromDate).lte(toDate);
    }

    const data = await query.skip(skip).limit(take);
    const count = await countQuery;

    return res
      .status(200)
      .json({ message: "Orders were retrieved successfully!", data, count });
  });

  getOrderById = ServiceErrorHandler(async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);

    if (!order) {
      throw new Error({
        status: 400,
        message: "Not found order!",
      });
    }

    return res.status(200).json({ message: "Order was gotten!", order });
  });
}

module.exports = new OrderService();
