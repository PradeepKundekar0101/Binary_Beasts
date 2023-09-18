const express =require("express");
const router = express.Router();
const UserApplication = require("../models/userapplication");

router.post('/add', async (req, res) => {
  try {
    const newApp = new UserApplication(req.body);
    const savedUser = await newApp.save();
    
    const accountSid = process.env.ACCOUNTSID;
    const authToken = process.env.AUTHTOKEN;
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: savedUser.firstname+" Has Sent the Account for Verification, Please Check the User Section.",
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+917411420401'
        })
        .then(message => console.log(message.sid))
        res.status(201).json({success:true,data:savedUser});
  } catch (error) {
    console.error('Error posting application:', error);
    res.status(500).json({ error: 'Failed to post application' });
  }
});


router.get('/allApplications',async(req,res)=>{
  try {
    const all = await UserApplication.find({});
    res.status(201).json({data:all,success:true});
  } catch (error) {
    console.log(error.message);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const  orderId  = req.params.id;
   
    const order = await UserApplication.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Applications not found' });
    }
    await UserApplication.deleteOne({ _id: orderId });
    res.json({ success:true,message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



  module.exports = router