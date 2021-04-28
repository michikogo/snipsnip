const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Import Models
const UrlModel = require("./Model/UrlModel");
const { findOneAndRemove } = require("./Model/UrlModel");

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
app.use(cors);

// Routes
// app.get("/", (req, res) => {
//   const url = new UrlModel({
//     fullURL: "https://www.google.com/",
//     shortURL: "1234",
//     click: 12,
//   });

//   url
//     .save()
//     .then((url) => {
//       res.send("[CREATE] " + url);
//     })
//     .catch((err) => {
//       res.status(500).send(err.message);
//     });
// });

// Listen to port
app.listen("4001", () => {
  console.log("Server listen to port 4001");
});
