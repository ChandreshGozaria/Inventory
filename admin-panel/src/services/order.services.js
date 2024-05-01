const { Forbidden, InternalServerError, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const AccessToken = require("../utils/utils.accessToken");
const Order = require("../models/order.model");
const ObjectId = require("mongoose").Types.ObjectId;
class OrderServices {


    static async createOrder(payload) {
        try {

            const { clientId, productName, price } = payload;
            
            const newOrder = await Order.create({
                clientId,
                productName,
                price,
                status: 'pending'
            });

            return {
                status: true,
                data: newOrder,
                message: "Order placed successfully",
                error: null,
            };
        } catch (error) {
            return {
                status: false,
                data: null,
                message: error.message,
                error,
            };
        }
    }

    static async getAllOrderByUserId(payload) {
        try {

            const orders = await Order.aggregate([
                { $match: { clientId: new ObjectId(payload) } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'clientId',
                        foreignField: '_id',
                        as: 'clientDetails'
                    }
                },
                { $unwind: '$clientDetails' }
            ]);

            if (orders.length === 0) {
                return {
                    status: true,
                    data: orders,
                    message: "Order Not found.",
                    error: null,
                };
            }

            return {
                status: true,
                data: orders,
                message: "All order data retrieved successfully.",
                error: null,
            };
        } catch (error) {

            return {
                status: false,
                data: null,
                message: error.message,
                error,
            };
        }
    }
}

module.exports = OrderServices;
