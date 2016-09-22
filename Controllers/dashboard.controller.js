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
