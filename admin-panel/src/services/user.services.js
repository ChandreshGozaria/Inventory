const { Forbidden, InternalServerError, Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const AccessToken = require("../utils/utils.accessToken");
const User = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;
class UserServices {
    // Create User
    static async createDummyUsers(req, res) {
        try {
            const dummyUsers = [
                {
                    name: "Admin User 1",
                    email: "admin1@example.com",
                    password: "password",
                    role: "admin",
                },
                {
                    name: "Admin User 2",
                    email: "admin2@example.com",
                    password: "password",
                    role: "admin",
                },
                {
                    name: "Client User 1",
                    email: "client1@example.com",
                    password: "password",
                    role: "client",
                },
                {
                    name: "Client User 2",
                    email: "client2@example.com",
                    password: "password",
                    role: "client",
                },
                {
                    name: "Client User 3",
                    email: "client3@example.com",
                    password: "password",
                    role: "client",
                },
            ];

            // Insert dummy users into database
            let addUser = await User.insertMany(dummyUsers);
            if (!addUser) {
                throw InternalServerError("Unable to save User's data");
            }
            return {
                status: true,
                data: addUser,
                message: "User create successfull",
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

    static async usersLogin(payload) {
        try {
            const { email, password } = payload;

            const getUser = await User.findOne(
                { email },
                {
                    name: 1,
                    email: 1,
                    password: 1,
                    role: 1,
                }
            );

            if (!getUser) {
                throw Unauthorized("User with the email provided does not exist.");
            }

            //       let isverified = await bcrypt.compare(password, user.password);
            let isverified = password === getUser.password;

            if (!isverified) {
                throw Unauthorized("Email and Password do not match");
            }

            //generate token using user object above and store it in cookie
            let _user = getUser._doc;
            const token = AccessToken.generateAccessToken(_user);

            getUser.password = undefined;

            return {
                status: true,
                data: {
                    user: getUser,
                    token,
                },
                message: "Login successfully",
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

    static async getUserById(payload) {
        try {

            const userInfo = await User.findOne({ "_id": payload }, { __v: 0 });
            if (!userInfo) {
                throw Unauthorized("User does not exist.");
            }

            return {
                status: true,
                data: userInfo,
                message: "Get User successfull",
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

    static async updateUserById(req) {
        try {
            
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };

            const updateUser = await User.findByIdAndUpdate(
                id, updatedData, options
            );
            if (!updateUser) {
                throw Unauthorized("User does not exist");
            }

            return {
                status: true,
                data: updateUser,
                message: "User updated successfully",
                error: null
            };

        } catch (error) {
            return {
                status: false,
                data: null,
                message: error.message,
                error
            };
        }
    }

    static async getAllUser(payload) {
        try {

            const userInfo = await User.find({ }, { __v: 0 });
            if (!userInfo) {
                throw Unauthorized("Users does not exist.");
            }

            return {
                status: true,
                data: userInfo,
                message: "All user data retrieved successfully.",
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

module.exports = UserServices;
