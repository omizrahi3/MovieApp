/* jshint node: true */

//************************************************************
//  tmdb_api/index.js                                       //
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

var tmdb_apiController = require('./../../Controllers/tmdb_api.controller');

module.exports = function(app) {
  app.get('/most-popular', tmdb_apiController.mostPopular);
  app.get('/coming-soon', tmdb_apiController.comingSoon);
  app.get('/top-rated', tmdb_apiController.topRated);
}
