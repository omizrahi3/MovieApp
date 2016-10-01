/* jshint node: true */

//************************************************************
//  server.js                                               //
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

var express = require('express');
var bodyparser = require('body-parser');
var bcrypt = require('bcryptjs');
var router = require('./Routes');
var mongoose = require('mongoose');
var sessions = require('client-sessions');

var app = express();

app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/storemovies1');

app.use(express.static('./public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(sessions({
  cookieName: 'session',
  secret: 'hukl2oiiros9d39220jisps932j929459rj',
  duration: 30 * 60* 1000,
  activeDuration: 5 * 60 * 1000,
}));

router(app);

app.listen(process.env.PORT || 3000, function(){
  console.log('listening on port 3000');
});
