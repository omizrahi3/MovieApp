'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var RatingSchema = new Schema({
  score: Number,
  createdAt: { type : Date, default : Date.now },
  username: String,
  userId: String,
  movieId: String
});

module.exports = mongoose.model('Rating', RatingSchema);
