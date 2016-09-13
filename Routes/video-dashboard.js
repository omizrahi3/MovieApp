var Movie = require('./../Models/Movie.model');
var User = require('./../Models/User.model');

function getMovie(movieId, callback) {
  Movie.findById(movieId, function(err, movieDB) {
    callback(err, movieDB);
  });
}

function requirePurchase(req, res, next) {
  if (req.user) {
    for (i = 0; i < req.user.purchasedMovies.length; i++) {
      if (req.params.movie_id == req.user.purchasedMovies[i].movieId) {
        return next();
      }
    }
    return res.redirect('/');
  }
  else {
    return res.redirect('/');
  }
}

module.exports = function(app) {

  app.get('/movie/:movie_id/video-dashboard', requirePurchase, function(req, res){
    res.locals.title = 'video-dashboard';
    res.locals.baseurl = "http://image.tmdb.org/t/p/w1280";
    getMovie(req.params.movie_id, function(err, movie) {
      if (err) {
        res.send(err);
      }
      else {
        res.locals.purchased = true;
        res.locals.movie = movie;
        res.render('video-dashboard');
      }
    });
  });

  app.get('/movie/:movie_id/video-dashboard/:stream_id', requirePurchase, function(req, res){
    res.locals.title = 'video-stream';
    res.locals.stream_path = req.params.stream_id;
    res.render('video-player');
  });


}
