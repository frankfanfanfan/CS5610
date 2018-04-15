var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/cs5610');
var db = mongoose.connect('mongodb://frank:fan@ds263837.mlab.com:63837/heroku_013jzpv3');
module.exports = db;
