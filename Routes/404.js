/* jshint node: true */

//************************************************************
//  404.js                                                  //
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

var _404Controller = require('./../Controllers/404.controller')

module.exports = function(app) {
  app.get('*', _404Controller);
}
