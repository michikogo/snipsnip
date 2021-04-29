const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Import Controller
const urlController = require("./Controller/UrlController");

// Connect to mongoDB
mongoose
  .connect(
    "mongodb+srv://user:1234@urlshortenercluster.mrve2.mongodb.net/urlDB?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB connection established successfully");
  })
  .catch((err) => {
    console.log("Cannot connect to MongoDB: " + err);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(urlController);

// Listen to port
app.listen(3001, () => {
  console.log("Server listen to port 4001");
});
