const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/utils.accessToken");
const OrderController = require("../controllers/order.controller");


// Insert order
router.post("/create",verifyToken, OrderController.createOrder);

/*
type: Get
Route: Get All Order
*/
router.get('/getAllOrderByUserId', verifyToken,OrderController.getAllOrderByUserId);

// //get Order with id
// router.get("/:id", verifyToken, OrderController.getOrderById);

// /*
// type: put
// Route: update Order By Id
// */
// router.put('/:id',verifyToken, OrderController.updateOrderById);


module.exports = router;
