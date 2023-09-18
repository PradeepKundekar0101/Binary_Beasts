const express = require("express");
const {signinController,signupController,updateUser,getUserById,addPost} = require("../controllers/userController.js");
const router = express.Router();
const authMiddleware = require("../middleware/auth.js");
const User = require("../models/user.js");

router.post("/signup",signupController);
router.post("/signin",signinController);
router.get("/getAllUsers",async(req,res)=>{
    try {
        const users = await User.find({});
        res.send({success:true,data:users});
    } catch (error) {
        console.log(error.message);
    }
})
router.get("/:id",getUserById);
router.put("/update",authMiddleware,updateUser);

router.put('/verify/:userId', async (req, res) => {
    try {
      const  userId  = req.params.userId;
      const selectedUser = req.body; 
      console.log(selectedUser);
      if (!selectedUser) {
        return res.status(400).json({ error: 'Selected user data is missing' });
      }
      const updatedUser = await User.findByIdAndUpdate(userId,{phonenumber:selectedUser.phonenumber,firstname:selectedUser.firstname,lastname:selectedUser.lastname,role:selectedUser.role, verified: true }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ success: true, data: updatedUser });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;