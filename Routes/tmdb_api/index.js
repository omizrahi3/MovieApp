var MovieDB = require('moviedb')('188b29beddd76833cd397ee65e9e4eaa');
var User = require('./../../Models/User.model');

module.exports = function(app) {

  app.get('/most-popular', function(req, res){
    MovieDB.miscPopularMovies(function(error, response){
      res.locals.movies = response.results;
      res.locals.movieurl = "/movie/";
      res.locals.baseurl = "http://image.tmdb.org/t/p/w300";
      res.locals.title = 'Most Popular';
      res.render('index');
    });
  });

  app.get('/coming-soon', function(req, res){
    MovieDB.miscUpcomingMovies(function(error, response){
      res.locals.movies = response.results;
      res.locals.movieurl = "/movie/";
      res.locals.baseurl = "http://image.tmdb.org/t/p/w300";
      res.locals.title = 'Coming Soon';
      res.render('index');
    });
  });

  app.get('/top-rated', function(req, res){
    MovieDB.miscTopRatedMovies(function(error, response){
      res.locals.movies = response.results;
      res.locals.movieurl = "/movie/";
      res.locals.baseurl = "http://image.tmdb.org/t/p/w300";
      res.locals.title = 'Top Rated';
      res.render('index');
    });
  });

}
