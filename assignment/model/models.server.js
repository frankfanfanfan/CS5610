var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/cs5610');

module.exports = db;
