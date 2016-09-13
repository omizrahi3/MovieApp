'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

var ReplySchema = new Schema({
  body: {type: String, required: true},
  likes: Number,
  dislikes: Number,
  createdAt: { type : Date, default : Date.now },
  username: String,
  userId: String,
});

var CommentSchema = new Schema({
  body: {type: String, required: true},
  likes: Number,
  dislikes: Number,
  createdAt: { type : Date, default : Date.now },
  username: String,
  userId: String,
  replies: [ReplySchema]
});

var RatingSchema = new Schema({
  score: Number,
  createdAt: { type : Date, default : Date.now },
  username: String,
  userId: String,
});

var VideoSchema = new Schema({
  video_title: String,
  video_path: String,
  likes: Number,
  dislikes: Number
});

//useful because then I can just call length to get total likes
var LikeSchema = new Schema({
  user_id: {type: String, unique: true},
  createdAt: { type : Date, default : Date.now }
});

//useful because then I can just call length to get total dislikes
var DislikeSchema = new Schema({
  user_id: {type: String, unique: true},
  createdAt: { type : Date, default : Date.now }
});

var MovieSchema = new Schema(
  {
    id: {type: String, unique: true},
    movie_title: String,
    description: String,
    poster_url: String,
    backdrop_url: String,
    ave_rating: Number,
    num_of_ratings: Number,
    comments: [CommentSchema],
    ratings: [RatingSchema],
    videos: [VideoSchema]
  }
);

module.exports = mongoose.model('Movie', MovieSchema);
