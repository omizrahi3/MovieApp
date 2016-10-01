/* jshint node: true */

//************************************************************
//  register.controller.js                                  //
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

function getMovie(movieId, callback) {
  Movie.findById(movieId, function(err, movieDB) {
    callback(err, movieDB);
  });
}


var requirePurchase = function(req, res, next)
{
  if (req.user) {
    for (var i = 0; i < req.user.purchasedMovies.length; i++) {
      if (req.params.movie_id == req.user.purchasedMovies[i].movieId) {
        return next();
      }
    }
    return res.redirect('/');
  }
  else {
    return res.redirect('/');
  }
}

var videoDashboard = function(req, res)
{
  res.locals.title = 'video-dashboard';
  res.locals.baseurl = "http://image.tmdb.org/t/p/w1280";
  getMovie(req.params.movie_id, function(err, movie) {
    if (err) {
      res.send(err);
    }
    else {
      res.locals.purchased = true;
      res.locals.movie = movie;
      res.render('video-dashboard');
    }
  });
}

var videoStream = function(req, res)
{
  res.locals.title = 'video-stream';
  res.locals.stream_path = req.params.stream_id;
  res.render('video-player');
}

module.exports =
{
    requirePurchase: requirePurchase,
    videoDashboard: videoDashboard,
    videoStream: videoStream
}
