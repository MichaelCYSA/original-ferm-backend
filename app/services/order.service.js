const Order = require("../models/order");
const ServiceErrorHandler = require("../@lib/serviceErrorHandler");

class OrderService {
  newOrder = ServiceErrorHandler(async (req, res) => {
    const order = req.body;
    const newOrder = new Order(order);
    await newOrder.save();
    return res.status(201).json({ message: "Order created!" });
  });

  updateOrder = ServiceErrorHandler(async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    const order = await Order.findById(id);

    if (!order) {
      throw new Error({
        status: 404,
        message: "Not found !",
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
        status: 404,
        message: "Not found !",
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
        status: 404,
        message: "Not found !",
      });
    }
    return res.status(200).json({ message: "Order was gotten!", order });
  });
}
module.exports = new OrderService();
