const Order = require("../models/order");
const Product = require("../models/product");
const ServiceErrorHandler = require("../@lib/serviceErrorHandler");
const sendMessageToTelegram = require("../utils/sendMessageToTelegram");

const deleveryPrice = 40;


const countAndReturnAllSelectedProducts = async (
  orderedProducts = {},
  existsProducts
) => {
  const products = await Product.find({
    _id: { $in: Object.keys(orderedProducts) },
    disabled: { $ne: true },
  });
  const totalPrice = products.reduce((total, product) => {
    return total + product.price * orderedProducts[product._id];
  }, 0);

  const mappedProducts = products.map((product) => ({
    ...product._doc,
    count: orderedProducts[product._id],
  }));

  return [totalPrice, mappedProducts];
};

class OrderService {
  newOrder = ServiceErrorHandler(async (req, res) => {
    const order = req.body;
    
    if (!Object.keys(order.products)?.length) {
      throw new Error({
        status: 400,
        message: "Not found selected products !",
      });
    }

    let [totalPrice, products] = await countAndReturnAllSelectedProducts(
      order.products
    );

    if (!products.length) {
      throw new Error({
        status: 400,
        message: "Not found selected products !",
      });
    }

    totalPrice + deleveryPrice;

    const newOrder = new Order({ ...order, totalPrice, products });
    await newOrder.save(order);
    const msg = await sendMessageToTelegram(order);
    return res.status(201).json({ message: "Order created!", msg });
  });

  updateOrder = ServiceErrorHandler(async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    
    delete updates.products
    delete updates.totalPrice
   // const [totalPrice, products] = await countAndReturnAllSelectedProducts(
   //   updates.products
   // );

   // if (products?.length) {
   //   updates.totalPrice = totalPrice;
   //   updates.products = products;
   // }

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
    const { skip = 0, take = 10, status = '', fromDate, toDate } = req.query;

    let query = Order.find();
    let countQuery = Order.countDocuments();

    if (status != '') {
      query = query.where("status", status);
      countQuery = countQuery.where("status", status);
    }
    if (fromDate && toDate) {
      countQuery = countQuery.where("createdAt").gte(fromDate).lte(toDate);
      query = query.where("createdAt").gte(fromDate).lte(toDate);
    }

    const data = await query.skip(skip).limit(take).sort({ createdAt: "desc" });
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
