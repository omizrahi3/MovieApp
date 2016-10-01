/* jshint node: true */

//************************************************************
//  404.controller.js                                       //
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

var _404 = function (req, res)
{
    res.status(404).send('404 Page Not Found');
};

module.exports =
{
    _404: _404
}
