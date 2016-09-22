"use strict"

var dashboardController = require('./../Controllers/dashboard.controller')

module.exports = function(app) {

  app.get('/dashboard', dashboardController.requireLogin, dashboardController.getDashboard);

}
