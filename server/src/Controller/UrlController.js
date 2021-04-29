const express = require("express");
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

// rerouting
urlControllerRouter.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  res.send("Found ID: " + id);

  UrlModel = findById(id, (err, updateURL) => {
    if (!updateURL) {
      console.log(`[UPDATE] ${err}`);
    } else {
      updateURL.click = req.body.click++;
      updateURL
        .save()
        .then((urlData) => {
          console.log(`[UPDATE] ${urlData}`);
        })
        .catch((err) => {
          console.log(`[UPDATE] ${err}`);
        });
    }
  });
});

module.exports = urlControllerRouter;
