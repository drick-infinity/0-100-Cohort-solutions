// start writing from here
const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todo');
const userRouter = require("./routes/user");
const { connectToDatabase } = require('./db');
require('dotenv').config();

// ✅ Create the Express app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/todo", todoRouter);
app.use("/user", userRouter);

// ✅ Start the server after DB connection
connectToDatabase().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch((err) => {
    console.error("Failed to connect to the database:", err);
});


