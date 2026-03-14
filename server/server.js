const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const MONGO_URI = "MONGO_URI";

// Import routes
const taskRoutes = require("./routes/taskRoutes");

// Routes
app.use("/api/tasks", taskRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
  console.log("MongoDB connected");

  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });

})
.catch((err) => {
  console.log("Database connection error:", err);
});
