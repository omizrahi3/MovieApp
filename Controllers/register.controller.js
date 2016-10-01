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

var User = require('./../Models/User.model');

var requireNoLogin = function(req, res, next)
{
  if (req.user) {
    res.redirect('/');
  }
  else next();
}

var register = function(req, res)
{
    res.locals.title = 'register';
    res.render('register');
}

module.exports =
{
    requireNoLogin: requireNoLogin,
    register: register
}
