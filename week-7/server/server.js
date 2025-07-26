//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Only allow this origin
    credentials: true               // Allow cookies if needed
  }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;  // This should be in an environment variable in a real application
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB connected");
}).catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
});

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  // userSchema here
  username:String,
  password:String,
  purchasedCourses:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  }]
  
});

const adminSchema = new mongoose.Schema({
// adminSchema here
  username:String,
  password:String
});

const courseSchema = new mongoose.Schema({
// courseSchema here
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    published:Boolean
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

const authMiddleware = (req, res, next) => {
//  authMiddleware logic here 
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,JWT_SECRET,(err,user)=>{
            if(err) {
                return res.status(403).json({
                    message:"Forbidden: Invalid token"
                })}
            req.user = user;
            next();
        });
    }else{
        res.status(401).json({
            message:"Unauthorized: No token provided"
        });
    }

};

// Admin routes
app.post('/admin/signup',async (req, res) => {
    // logic to sign up admin
    const {username,password} = req.body;
    const existingAdmin = await Admin.findOne({
        username
    });
    if(existingAdmin){
        return res.status(403).json({
            message:"Admin already exists"
        });
    }
    const admin = new Admin({
        username,password
    });
    await admin.save();
    const token = jwt.sign({username,role:"admin"},JWT_SECRET,{expiresIn: "1h"});
    res.json({message:"Admin created successfully",token});
});

app.post('/admin/login', async(req, res) => {
    // logic to log in admin
    const {username,password} = req.body;
    const admin = await Admin.findOne({
        username,
        password
    });
    if(!admin){
         return res.status(403).json({
            message:"Invalid crediantials"
         });
    }
    const token = jwt.sign({username , role:"admin"},JWT_SECRET,{expiresIn:"1h"});
    res.json({message:"Loggedin successfully",token});
});

app.post('/admin/courses', authMiddleware,async(req, res) => {
    // logic to create a course
    const course = new Course(req.body);
    await course.save();
    res.json({
        message:"Course created successfully",courseId:course._id
    });
});

app.put('/admin/courses/:courseId', authMiddleware,async (req, res) => {
    // logic to edit a course
    await Course.findByIdAndUpdate(req.params.courseId,req.body);
    res.json({message:"Course updated successfully"});
});

app.get('/admin/courses',authMiddleware, async(req, res) => {
    // logic to get all courses
    const courses = await Course.find({});
    res.json({courses});
});

// User routes
app.post('/users/signup', async(req, res) => {
    // logic to sign up user
    const {username,password} = req.body;
    const existingUser = await User.findOne({
        username
    })
    if(existingUser) return res.status(403).json({
        message:"User already exists"
    });
    const user = new User({
        username,password
    });
    await user.save();
    const token = jwt.sign({
        username,role:"user"} ,JWT_SECRET,{expiresIn:"1h"}
    );
    res.json({message:"User created successfully",token});
});

app.post('/users/login',async (req, res) => {
    // logic to log in user
    const {username,password} = req.headers;
    const user = await User.findOne({
        username,password
    });
    if(!user){
        return res.status(403).json({
            message:"Invalid credentials"
        })
    }
    const token = jwt.sign({username,role:"user"},JWT_SECRET,{expiresIn:"1h"});
    res.json({message:"Logged in successfully",token})
});

app.get('/users/courses', async (req, res) => {
    // logic to list all courses
    const courses = await Course.find({
        published:true
    });
    res.json({courses});
});

app.post('/users/courses/:courseId',authMiddleware,async (req, res) => {
    // logic to purchase a course
    const course = await Course.findById(req.params.courseId);
    if(!course || !course.published){
        return res.status(404).json({
            message:"Course not found"
        });
    }
    const user = await User.findOne({
        username:req.user.username
    });
    if(!user.purchasedCourses.includes(course._id)){
        user.purchasedCourses.push(course._id);
        await user.save();
    }
    res.json({
        message:"Course purchased successfully"
    });
});

app.get('/users/purchasedCourses',authMiddleware,async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({
        username:req.user.username
    }).populate("purchasedCourses");
    res.json({purchasedCourses:user.purchasedCourses});
});

app.listen(PORT, () => {
    console.log('Server is listening on port 3000');
});