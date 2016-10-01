/* jshint node: true */

//************************************************************
//  dashboard.js                                            //
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

var dashboardController = require('./../Controllers/dashboard.controller');

module.exports = function(app) {
  app.get('/dashboard', dashboardController.requireLogin, dashboardController.getDashboard);
}
