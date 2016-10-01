/* jshint node: true */

//************************************************************
//  logout.controller.js                                    //
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

var logout = function(req, res)
{
    req.session.reset();
    res.redirect('/');
}

module.exports =
{
    logout: logout
}
