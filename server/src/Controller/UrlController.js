const express = require("express");
const urlControllerRouter = express.Router();

// Import Model
const UrlModel = require("../Model/UrlModel");

// Trial
// urlControllerRouter.get("/", async (req, res) => {
//   const url = new UrlModel({
//     fullURL: "https://www.google.com/",
//     shortURL: "1234",
//     click: 12,
//   });

//   try {
//     await url.save();
//     res.send(`[CREATE] ${url}`);
//   } catch (err) {
//     console.log(err);
//   }
// });

// Create
urlControllerRouter.post("/insert", async (req, res) => {
  const url = new UrlModel(req.body);
  console.log(url);

  try {
    url.save();
    res.send(`[CREATE] ${url}`);
  } catch (err) {
    console.log(err);
  }
});
// Read
urlControllerRouter.get("/read", async (req, res) => {
  UrlModel.find();
});
module.exports = urlControllerRouter;
