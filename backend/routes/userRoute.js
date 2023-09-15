const express = require("express");
const {signinController,signupController,updateUser,getUserById,addPost} = require("../controllers/userController.js");
const router = express.Router();
const authMiddleware = require("../middleware/auth.js")

router.post("/signup",signupController);
router.post("/signin",signinController);
router.get("/:id",getUserById);
router.put("/update",authMiddleware,updateUser);
// router.put("/addpost",authMiddleware,addPost);

module.exports = router;