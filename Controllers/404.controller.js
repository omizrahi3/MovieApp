"use strict"

var _404 = function (req, res)
{
    res.status(404).send('404 Page Not Found');
};

module.exports = _404;
