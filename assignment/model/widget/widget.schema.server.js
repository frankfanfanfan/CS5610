var mongoose = require("mongoose");

var widgetSchema  = mongoose.Schema({
  _page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'websiteModel'
  },
  widgetType: {
    type: String,
    enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'TEXT', 'HTML']
  },
  name: String,
  text: String,
  placeholder: String,
  description: String,
  url: String,
  height: String,
  rows: Number,
  size: Number,
  class: String,
  icon: String,
  deletable: Boolean,
  formatted: Boolean,
  dateCreate: {
    type: Date,
    default: Date.now()
  }
}, {collection: 'widget'});

module.exports = widgetSchema;
