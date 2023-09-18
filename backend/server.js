
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");


const userRoute = require("./routes/userRoute");
const itemRoute = require("./routes/itemRoute");
const orderRoute = require("./routes/orderRoutes");
const applicationRoute = require("./routes/userapplication")



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
app.use("/items",itemRoute);
app.use("/orders",orderRoute);

app.use("/userapplication",applicationRoute);
// app.use("/post",postRoute);
//Listen the app
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server running at PORT = "+PORT);
})