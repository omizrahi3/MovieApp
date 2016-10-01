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

var MovieDB = require('moviedb')('YOUR TMDB KEY HERE');
var User = require('./../Models/User.model');

var topRated = function(req, res)
{
  MovieDB.miscTopRatedMovies(function(error, response){
    res.locals.movies = response.results;
    res.locals.movieurl = "/movie/";
    res.locals.baseurl = "http://image.tmdb.org/t/p/w300";
    res.locals.title = 'Top Rated';
    res.render('index');
  });
}

var comingSoon = function(req, res)
{
  MovieDB.miscUpcomingMovies(function(error, response){
    res.locals.movies = response.results;
    res.locals.movieurl = "/movie/";
    res.locals.baseurl = "http://image.tmdb.org/t/p/w300";
    res.locals.title = 'Coming Soon';
    res.render('index');
  });
}

var mostPopular = function(req, res)
{
  MovieDB.miscPopularMovies(function(error, response){
    res.locals.movies = response.results;
    res.locals.movieurl = "/movie/";
    res.locals.baseurl = "http://image.tmdb.org/t/p/w300";
    res.locals.title = 'Most Popular';
    res.render('index');
  });
}

module.exports =
{
    topRated: topRated,
    comingSoon: comingSoon,
    mostPopular: mostPopular
}
