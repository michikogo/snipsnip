const mongoose = require("mongoose");

const UrlModel = new mongoose.Schema({
  fullURL: {
    type: String,
    require: true,
  },
  shortURL: {
    type: String,
    require: true,
  },
  click: {
    type: Number,
    require: true,
  },
});

const urlSchema = mongoose.model("UrlCollection", UrlModel);
module.exports = urlSchema;
