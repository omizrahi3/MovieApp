/* jshint node: true */

//************************************************************
//  dashboard.controller.js                                 //
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

var requireLogin = function (req, res, next)
{
    if (!req.user) {
        req.session.reset();
        res.redirect('/');
    }
    else next();
}

var getDashboard =  function(req, res)
{
    res.locals.title = 'dashboard';
    res.render('dashboard');
}

module.exports =
{
    requireLogin: requireLogin,
    getDashboard: getDashboard
}
