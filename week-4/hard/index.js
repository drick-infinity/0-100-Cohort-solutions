// const express = require("express");
// const dotenv = require("dotenv");
// dotenv.config();

// const app = express();
// const port = process.env.PORT;

// app.use(express.json());

// app.get("/healthy", (req, res)=> res.send("I am Healthy"));

// //  start writing your routes here

// app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));


const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check route
app.get("/healthy", (req, res) => res.send("I am Healthy"));

// Routes
const todoRoutes = require("./routes/todo");
app.use("/todos", todoRoutes);

const authRoutes = require('./routes/user');
app.use('/', authRoutes);
// MongoDB Connection
mongoose.connect('mongodb-url')
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
