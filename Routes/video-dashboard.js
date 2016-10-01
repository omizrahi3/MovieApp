/* jshint node: true */

//************************************************************
//  video-dashboard.js                                      //
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

var videoDashboardController = require('./../Controllers/video-dashboard.controller');

module.exports = function(app) {
  app.get('/movie/:movie_id/video-dashboard', videoDashboardController.requirePurchase, videoDashboardController.videoDashboard);
  app.get('/movie/:movie_id/video-dashboard/:stream_id', videoDashboardController.requirePurchase, videoDashboardController.videoStream);
}
