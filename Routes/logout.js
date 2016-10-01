/* jshint node: true */

//************************************************************
//  logout.js                                               //
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

var logoutController = require('./../Controllers/logout.controller');

module.exports = function(app) {
  app.get('/logout', logoutController.logout);
}
