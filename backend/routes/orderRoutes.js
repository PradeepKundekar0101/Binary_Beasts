const express =require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
router.get('/getAllOrders', async (req, res) => {
    try {
      const orders = await Order.find({});
      res.json(orders); 
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.post('/placeOrder', async (req, res) => {

    try {
      const { user_id, item_name,item_id, quantity,user_email } = req.body;
      const newOrder = new Order({
        user_id,  
        user_email,
        item_name,
        item_id,
        quantity
      }); 
      const savedOrder = await newOrder.save();
      const ACCOUNTSID = process.env.ACCOUNTSID;
      const AUTHTOKEN = process.env.AUTHTOKEN;
      const client = require('twilio')(ACCOUNTSID, AUTHTOKEN);
      client.messages
          .create({
              body: "A New Order is been Placed by"+user_email,
              from: 'whatsapp:+14155238886',
              to: 'whatsapp:+917411420401',
          })
          .then(message => console.log(message.sid))
      res.status(201).send({success:true,data:savedOrder}); 
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:orderId', async (req, res) => {
    try {
      const orderId  = req.params.orderId;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      const userFound = await User.find({phonenumber:order.phonenumber});
    
      order.confirmed = true; 
      await order.save();
      res.json({ success:true,message: 'Order status updated to verified' });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


  router.delete('/:orderId', async (req, res) => {
    try {
      const  orderId  = req.params.orderId;
      console.log(orderId)
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      await Order.deleteOne({ _id: orderId });
      res.json({ success:true,message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;