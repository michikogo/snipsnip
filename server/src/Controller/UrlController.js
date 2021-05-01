const express = require("express");
const { update } = require("../Model/UrlModel");
// const { update, findById } = require("../Model/UrlModel");
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
  UrlModel.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
      console.log(`[READ] ${result}`);
    }
  });
});

// reading specific update
// urlControllerRouter.get("/update/:id", async (req, res) => {
//   const id = req.params.id;
//   UrlModel.findById(id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(result);
//       console.log(`[READ] ${result}`);
//     }
//   });
// });

urlControllerRouter.post("/update/:id", (req, res) => {
  const id = req.params.id;

  UrlModel.findById(id)
    .then((updateURL) => {
      updateURL.click = req.body.click;
      updateURL
        .save()
        .then(() => {
          console.log(`[UPDATE] ${updateURL}`);
          res.status(200).json({
            message: updateURL,
          });
        })
        .catch((err) => {
          console.log(`[UPDATE] ${err}`);
          res.status(500).json({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      console.log(`[UPDATE] ${err}`);
      res.status(200).json({
        message: err.message,
      });
    });
});

module.exports = urlControllerRouter;
