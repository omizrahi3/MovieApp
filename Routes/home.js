/* jshint node: true */

//************************************************************
//  home.js                                                 //
//  MovieApp                                                //
//                                                          //
//  Created by Odell Mizrahi on 9/13/16.                    //
//  Copyright © 2016 Odell Mizrahi. All rights reserved.    //
//                                                          //
//  Date        Name        Description                     //
//  -------     ---------   --------------                  //
//  13Sep16     O. Mizrahi  Initial Design                  //
//                                                          //
//************************************************************

"use strict"

var MovieDB = require('moviedb')('188b29beddd76833cd397ee65e9e4eaa');
var User = require('./../Models/User.model');

module.exports = function(app) {

  app.get('/', function(req, res){
    MovieDB.miscNowPlayingMovies( function(error, response){
      res.locals.movies = response.results;
      res.locals.movieurl = "/movie/";
      res.locals.baseurl = "http://image.tmdb.org/t/p/w300";
      res.locals.title = 'Now Playing';
      res.render('index');
    });
  });

}
