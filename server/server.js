const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string
const MONGO_URI = "mongodb://admin:ZxePFemAHzshSdLz@ac-x1mvqkx-shard-00-00.zs3hqtl.mongodb.net:27017,ac-x1mvqkx-shard-00-01.zs3hqtl.mongodb.net:27017,ac-x1mvqkx-shard-00-02.zs3hqtl.mongodb.net:27017/?ssl=true&replicaSet=atlas-i0pbpl-shard-0&authSource=admin&appName=TaskManagerCluster";

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