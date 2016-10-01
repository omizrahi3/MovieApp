/* jshint node: true */

//************************************************************
//  home.controller.js                                      //
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

var MovieDB = require('moviedb')('188b29beddd76833cd397ee65e9e4eaa');
var User = require('./../Models/User.model');

var getHome = function(req, res)
{
    res.locals.title = 'Now Playing';
    res.locals.movieurl = "/movie/";
    res.locals.baseurl = "http://image.tmdb.org/t/p/w300";

    MovieDB.miscNowPlayingMovies( function(error, response){
        res.locals.movies = response.results;
        res.render('index');
    });
}

module.exports =
{
    getHome: getHome
}
