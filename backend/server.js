
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");


const userRoute = require("./routes/userRoute");
const Application = require("./models/application");
// const postRoute = require("./routes/post.js");
// const authUser= require("./middleware/auth.js");
// const {addPost} = require("./controllers/postController.js");

const app = express();
app.use(express.json());
app.use(cors());

const path = require('path');

const filename = path.basename(__filename);
const dirname = path.dirname(filename);


app.use('/uploads', express.static(path.join(dirname, 'uploads')));

//Connect to DB
try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB")
} catch (error) {
    console.log(error.message);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  
  const upload = multer({ storage: storage });

// app.post("/post/add",authUser,upload.single("image"),addPost);
app.use("/user",userRoute);
app.post("/application",async(req,res)=>{
    try {
      const newApplication = new Application({user:req.body});
      const savedApplication = await newApplication.save();
      
        res.status(200).send({success:true,message:"Application Sent successfully"});
    
  
    } catch (error) {
      res.status(400).send({success:false,message:"Application Failed"});
    }
    
})
// app.use("/post",postRoute);
//Listen the app
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server running at PORT = "+PORT);
})