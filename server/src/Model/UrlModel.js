const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
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

const urlModel = mongoose.model("UrlCollection", UrlSchema);
module.exports = urlModel;
