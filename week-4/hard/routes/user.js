const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const { User, Todo } = require("../database");

const activeTokens = new Set();
const JWT_SECRET = "mysecretpassword";
// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = new User({ name, email, password });
    await user.save();

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  // Implement user login logic
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invlaid email or password",
      });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    activeTokens.add(token);
    return res.json({
      message: "Login successfully",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

router.get("/todos", userMiddleware, async (req, res) => {
  // Implement logic for getting todos for a user
  try {
    const userId = req.user.userId;
    const todos = await Todo.find({
      user: userId,
    });
    res.json({ todos });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch todos",
      error: err.message,
    });
  }
});

router.post("/logout", userMiddleware, (req, res) => {
  // Implement logout logic
  const token = req.token;
  activeTokens.delete(token);
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
module.exports.activeTokens = activeTokens;
