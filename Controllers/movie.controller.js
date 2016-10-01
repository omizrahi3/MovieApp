/* jshint node: true */

//************************************************************
//  movie.controller.js                                     //
//  MovieApp                                                //
//                                                          //
//  Created by Odell Mizrahi on 9/30/16.                    //
//  Copyright © 2016 Odell Mizrahi. All rights reserved.    //
//                                                          //
//  Date        Name        Description                     //
//  -------     ---------   --------------                  //
//  30Sep16     O. Mizrahi  Initial Design                  //
//                                                          //
//************************************************************
"use strict"

var Movie = require('./../Models/Movie.model');
var User = require('./../Models/User.model');
var MovieDB = require('moviedb')('YOUR TMDB KEY HERE');

//
function addMovieToDB(movieId, movie, callback) {
  var vids = [];
  movie.videos.results.forEach(function(video){
    vids.push({"video_title": video.name, "video_path": video.key, "likes": 0, "dislikes": 0});
  });
  var addMovie = new Movie({
    id: movieId,
    movie_title: movie.title,
    description: movie.overview,
    poster_url: movie.poster_path,
    backdrop_url: movie.backdrop_path,
    videos: vids,
    ave_rating: 0,
    num_of_ratings: 0,
  });
  addMovie.save(function(err, movieSaved) {
    callback(movieSaved)
  });
}

function getMovies(callback) {
  Movie.find(function(err, movies) {
    callback(err, movies);
  });
}

function getMovieFromTMDB(movieId, callback) {
  MovieDB.movieInfo({id: movieId, append_to_response: 'videos'}, function(error, response){
    callback(response);
  });
}

function getMovieFromDB(movieId, callback) {
  Movie.findOne({id: movieId}, function(err, movieDB) {
    callback(movieDB);
  });
}

function getPurchased(userId, movieId, callback) {
  User.findById(userId, function(err, user) {
    console.log('purchasedMovies.length' + user.purchasedMovies.length);
    for (var i = 0; i < user.purchasedMovies.length; i++) {
      if (movieId == user.purchasedMovies[i].movieId) {
        return callback(true)
      }
    }
  });
  return callback(false);
}
//

var getMovieByID = function(req, res)
{
  res.locals.purchased = false;
  res.locals.title = 'Movie Page';
  res.locals.baseurl = "http://image.tmdb.org/t/p/w1280";

  getMovieFromDB(req.params.movie_id, function(movie_from_db) {
    if (!movie_from_db) {
      console.log('movie_id not in DB');
      getMovieFromTMDB(req.params.movie_id, function(movie_from_tmdb) {
        if (!movie_from_tmdb) {
          console.log('movie_id not in TMDB');
          res.status(404).send('404 Page Not Found');
          //res.send('movie id is not in db or tmdb');
        }
        else {
          console.log('movie_id in TMDB')
          addMovieToDB(req.params.movie_id, movie_from_tmdb, function(newMovie) {
            if (!newMovie) res.redirect('/');
            else {
              res.locals.movie = newMovie;
              res.render('movie');
            }
          })
        }
      })
    }
    else {
      console.log('movie_id in DB')
      res.locals.movie = movie_from_db;
      if (req.user) {
        for (var i = 0; i < req.user.purchasedMovies.length; i++) {
          if (movie_from_db._id == req.user.purchasedMovies[i].movieId) {
            console.log('true1')
            res.locals.purchased = true;
          }
        }
        console.log('true2')
        res.render('movie');
      }
      else {
        res.render('movie');
      }
    }
  });
}

module.exports =
{
    getMovieByID: getMovieByID
}
