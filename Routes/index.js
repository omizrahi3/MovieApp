var User = require('./../Models/User.model');

var home = require('./home');
var register = require('./register');
var dashboard = require('./dashboard');
var movie = require('./movie');
var video_dashboard = require('./video-dashboard');
var logout = require('./logout');
var movie_api = require('./movie_api');
var tmdb_api = require('./tmdb_api');
var user_api = require('./user_api');
var _404_ = require('./404');


module.exports = function(app) {

  app.use(function(req, res, next) {
    res.locals.user = null;
    if (req.session && req.session.user) {
      User.findOne({email: req.session.user.email}, function(err, user){
        if (user) {
          req.user = user;
          delete req.user.password;
          req.session.user = req.user;
          res.locals.user = user;
        }
        next();
      })
    }
    else next();
  });

  home(app);
  register(app);
  dashboard(app);
  movie(app);
  video_dashboard(app);
  logout(app);
  movie_api(app);
  tmdb_api(app);
  user_api(app);
  _404_(app);
}
