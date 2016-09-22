"use strict"

var _404Controller = require('./../Controllers/404.controller')

module.exports = function(app) {
  app.get('*', _404Controller);
}
