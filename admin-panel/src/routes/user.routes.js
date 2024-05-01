const express = require("express");
const router = express.Router();
const AccessToken = require("../middleware/authMiddleware");
const { verifyToken } = require("../utils/utils.accessToken");
const userController = require("../controllers/user.controller");

/*
type: POST
Route: Used to create dummy users.
*/
router.post("/create-dummy-users", userController.createUser);

/*
type: POST
Route: Handles user login.
*/
router.post("/login", userController.usersLogin);

/*
type: Get
Route: Retrieves all users.
*/
router.get('/getAllUser', verifyToken,userController.getAllUser);

/*
type: GET
Route:  Retrieves a user by their ID.
*/
router.get("/:id", verifyToken, userController.getUserById);

/*
type: put
Route:  Updates a user by their ID.
*/
router.put('/:id',verifyToken, userController.updateUserById);


module.exports = router;
