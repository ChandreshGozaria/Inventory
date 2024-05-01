const { Forbidden, InternalServerError, Unauthorized } = require("http-errors");
const UserServices = require('../services/user.services');
const Responses = require("../utils/utils.response");


class UsersController {

    static async createUser(req, res) {

        try {
            const result = await UserServices.createDummyUsers(req, res);
            const {
                status, error, message, data
            } = result;
            if (status) {
                res.status(201).json(Responses.successResponse(message, data));
            } else {
                res.status(error.status || 404).json(Responses.errorResponse(error));
            }
        } catch (error) {
            res.status(400).json(Responses.errorResponse(error))
        }
    }

    static async usersLogin(req, res) {
        try {

            const result = await UserServices.usersLogin(req.body);
            const {
                status, error, message, data
            } = result;
            if (status) {
                res.status(200).json(Responses.successResponse(message, data));
            } else {
                res.status(error.status || 401).json(Responses.errorResponse(error));
            }
        }
        catch (error) {
            res.status(401).json(Responses.errorResponse(error))
        }
    }

    static async getUserById(req, res) {
        try {

            if (req.authData.user.role !== 'admin') {
                // Check if requested user is the authenticated user
                if (req.authData.user._id.toString() !== req.params.id) {
                    throw Unauthorized("Access Denied: Only administrators have permission to view all user profiles.");
                }
            }

            const result = await UserServices.getUserById(req.params.id);
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

    static async updateUserById(req, res) {
        try {

            if (req.authData.user.role !== 'admin') {
                // Check if requested user is the authenticated user
                if (req.authData.user._id.toString() !== req.params.id) {
                    throw Unauthorized("Access Denied: Only administrators have permission to update all user profiles.");
                }
            }

            const result = await UserServices.updateUserById(req);
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

    static async getAllUser(req, res) {
        try {

            if (req.authData.user.role !== 'admin') {
                throw Unauthorized("Access Denied: Only administrators have permission to view all user profiles.");
            }

            const result = await UserServices.getAllUser();
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

module.exports = UsersController;