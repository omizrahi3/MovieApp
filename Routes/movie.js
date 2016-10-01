/* jshint node: true */

//************************************************************
//  movie.js                                                //
//  MovieApp                                                //
//                                                          //
//  Created by Odell Mizrahi on 9/13/16.                    //
//  Copyright © 2016 Odell Mizrahi. All rights reserved.    //
//                                                          //
//  Date        Name        Description                     //
//  -------     ---------   --------------                  //
//  30Sep16     O. Mizrahi  Initial Design                  //
//                                                          //
//************************************************************
"use strict"

var movieController = require('./../Controllers/movie.controller');

module.exports = function(app) {
  app.get('/movie/:movie_id', movieController.getMovieByID);
}
