const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const signupController = async (req, res) => {
    if(req.body.google)
    {
        const {username,profile,email} = req.body;
        try{
          const userFound = await User.findOne({ email });
          if (userFound) {
            return res.status(400).json({ message: "User already exist" });
          }
          const newUser = await User.create({username,email,profilePicture: profile,role:""});
          const token = jwt.sign({ email, id: newUser._id },process.env.JWT_SECRET);
          res.status(200).json({ data: newUser,success:true,token});
        } catch (error) {
          console.log(error.message);
          res.status(500).json({ message: error.message });
        }
    }
    else{
    const { email, password, username } = req.body;
    console.log(req.body);
    try {
      if(email === "" || password === "" || username=="")
        return res.status(400).json({ message: "Invalid field!" });
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exist!" });
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({email,password: hashedPassword,username});
      const token = jwt.sign({email: result.email,id: result._id},process.env.JWT_SECRET);
      res.status(200).json({ data: result,success:true,token});
    } catch (err) {
      console.log(err.message)
      res.status(500).json({ message: err.message });
    }
  }
};

const signinController = async(req,res) => {
    if (req.body.google){
        try{
          
          const email = req.body.email;
          const userFound = await User.findOne({email});
          if (!userFound) 
             return res.status(400).json({ message: "User does not exist" });
          const token = jwt.sign({email,id:userFound._id},process.env.JWT_SECRET);
          console.log(userFound )
          res.status(200).json({ data:userFound,token,success:true });
        } catch (error) {
          console.log(error.message)
          res.status(500).json({ message: error.message });
        }
      } 
      else{
        // normal-auth
        const {email, password} = req.body;
        if (email === "" || password === "") 
            return res.status(400).json({message: "Invalid field!"});
        try {
            const existingUser = await User.findOne({email})
            if (!existingUser) 
                return res.status(404).json({message: "User don't exist!"})
            const isPasswordOk = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordOk) 
                return res.status(400).json({message: "Invalid credintials!"})
            const token = jwt.sign({email: existingUser.email,id: existingUser._id},process.env.JWT_SECRET);
            res.status(200).json({data:existingUser,token,success:true})
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
};

const getUserById = async(req,res)=>{
  const id = req.params.id;
  try {
    const userFound = await User.findById(id);
    if(userFound) res.status(200).json({ data:userFound,success:true });
    else res.status(404).json({message:"User not found",success:false});
  } catch (error) {
    res.status(500).json({message:error.message,success:false});
  }
}

// const addPost = async(req,res)=>{
//   const post_Id = req.body.postId;
//   const user_Id = req.user._id;
//   try {
    
//     const updatedUser = await User.findByIdAndUpdate(user_Id,
//       { $push: { posts: post_Id } }, 
//       { new: true }
//     );
//     if (!updatedUser)
//     {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json({ message: 'Post added to user', success:true, data: updatedUser });
//   } catch (error) {
//     res.status(500).json({message:error.message,success:false});
//   }
// }

const updateUser = async(req,res)=>{
  const userId = req.user._id;
  const {role,firstname,lastname} = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId,{role,firstname,lastname},{new:true});
    if(!user){
      return res.status(404).json({success:false,message:" not found"});
    }
    return res.status(200).json({success:true,data:user});
  } catch (error) {
    return res.status(500).json({success:false,message:error.message});
  }
}

module.exports = { signinController, signupController,updateUser,getUserById};
