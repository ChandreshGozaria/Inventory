const { Forbidden, InternalServerError, Unauthorized } = require("http-errors");
const OrderServices = require('../services/order.services');
const Responses = require("../utils/utils.response");


class OrdersController {


    static async createOrder(req, res) {

        try {

            if (req.authData.user.role !== 'client') {
                throw Unauthorized("Access Denied: Only client have permission to view add order.");
            }
            req.body.clientId = req.authData.user._id;
            const result = await OrderServices.createOrder(req.body);
            const {
                status, error, message, data
            } = result;
            if (status) {
                res.status(201).json(Responses.successResponse(message, data));
            } else {
                res.status(error.status || 500).json(Responses.errorResponse(error));
            }
        } catch (error) {
            res.status(400).json(Responses.errorResponse(error))
        }
    }

    static async getAllOrderByUserId(req, res) {
        try {

            if (req.authData.user.role !== 'client') {
                throw Unauthorized("Access Denied: Only client have permission to view all order.");
            }

            const result = await OrderServices.getAllOrderByUserId(req.authData.user._id);
            const {
                status, error, message, data
            } = result;
            if (status) {
                res.status(201).json(Responses.successResponse(message, data));
            } else {
                res.status(error.status || 500).json(Responses.errorResponse(error));
            }
        } catch (error) {
            res.status(400).json(Responses.errorResponse(error))
        }
    }
}

module.exports = OrdersController;