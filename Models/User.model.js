'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var PurchasedMoviesSchema = new Schema({
  purchasedAt: { type : Date, default : Date.now },
  movieId: {type: String, unique: false},
  movie_title: String,
  poster_url: String
});

var UserSchema = new Schema(
  {
    email: {type: String, unique: true},
    username: String,
    password: String,
    balance: Number,
    purchasedMovies: [PurchasedMoviesSchema]
  }
);

module.exports = mongoose.model('User', UserSchema);
