var Movie = require('./../../Models/Movie.model');
var User = require('./../../Models/User.model');

//LIKES
function getLikes(movie_id, comment_id, callback) {
  Movie.findById(movie_id, function (e, data) {
    if (e) {
      console.log('findById error');
    }
    else {
      callback({likes : data.comments.id(comment_id).likes})
    }
  });
}
function postLike(movie_id, comment_id, callback) {
  Movie.findById(movie_id, function (e, data) {
    if (e) {
      console.log('findById error');
    }
    else {
      data.comments.id(comment_id).likes++;
      data.save(function(err, movieSaved) {
        var likesMinusDislikes = movieSaved.comments.id(comment_id).likes - movieSaved.comments.id(comment_id).dislikes;
        callback(err, {likes : movieSaved.comments.id(comment_id).dislikes, sum: likesMinusDislikes})
      });
    }
  });
}
//LIKES

//DISLIKES
function getDislikes(movie_id, comment_id, callback) {
  Movie.findById(movie_id, function (e, data) {
    if (e) {
      console.log('findById error');
    }
    else {
      callback({"dislikes" : data.comments.id(comment_id).dislikes})
    }
  });
}
function postDislike(movie_id, comment_id, callback) {
  Movie.findById(movie_id, function (e, data) {
    if (e) {
      console.log('findById error');
    }
    else {
      data.comments.id(comment_id).dislikes++;
      data.save(function(err, movieSaved) {
        var likesMinusDislikes = movieSaved.comments.id(comment_id).likes - movieSaved.comments.id(comment_id).dislikes;
        callback(err, {likes : movieSaved.comments.id(comment_id).dislikes, sum: likesMinusDislikes})
      });
    }
  });
}
//DISLIKES

//RATINGS
function getRatings(movie_id, callback) {
  Movie.findById(movie_id, function(err, movieDB) {
    console.log(movieDB);
    callback(err, movieDB.ratings);
  });
}
function postRating(movie_id, user_id, usrname, rating, callback) {
  Movie.findById(movie_id, function (e, data) {
    if (e) {
      console.log('findById error');
    }
    else {
      var roundedRating = Math.round(rating*2)/2;
      data.ratings.push(
        {score: roundedRating, username: usrname, userId: user_id}
      )
      var average = data.ave_rating;
      var numOfRatings = data.num_of_ratings;
      var newAverage = ((average * numOfRatings) + roundedRating) / (numOfRatings + 1)
      data.ave_rating = Math.round(newAverage * 100) / 100;
      data.num_of_ratings++;
      data.save(function(err, movieSaved) {
        callback(err, {average :movieSaved.ave_rating, ratings: movieSaved.ratings})
      });
    }
  });
}
//RATINGS

//REPLIES
function postReply(movie_id, comment_id, user_id, usrname, reply, callback) {
  Movie.findById(movie_id, function (e, data) {
    if (e) {
      console.log('findById error');
    }
    else {
      data.comments.id(comment_id).replies.push(
        {body: reply, likes: 0, dislikes: 0, username: usrname, userId: user_id}
      )
      data.save(function(err, movieSaved) {
        callback(err, movieSaved.comments.id(comment_id).replies)
      });
    }
  });
}
//REPLIES

//COMMENTS
function getComments(movie_id, callback) {
  Movie.findById(movie_id, function(err, movieDB) {
    console.log(movieDB);
    callback(err, movieDB.comments);
  });
}
function postComment(movie_id, user_id, usrname, comment, callback) {
  Movie.findById(movie_id, function (e, data) {
    if (e) {
      console.log('findById error');
    }
    else {
      data.comments.push(
        {body: comment, likes: 0, dislikes: 0, username: usrname, userId: user_id}
      )
      data.save(function(err, movieSaved) {
        console.log(movieSaved);
        callback(err, movieSaved.comments)
      });
    }
  });
}
//COMMENTS


//PURCHASE
function purchaseMovie(movie_id, user, callback) {
  Movie.findById(movie_id, function (e, movie) {
    if (e) {
      console.log('findById error');
    }
    else {
      user.purchasedMovies.push(
        {movieId: movie_id, movie_title: movie.movie_title, poster_url: movie.poster_url}
      )
      user.balance = user.balance - 499;
      user.save(function(err, userSaved) {
        callback(err, userSaved)
      });
    }
  });
}

module.exports = function(app) {

  //COMMENTS
  app.get('/movie/:movie_id/comments', function(req, res){
    getComments(req.params.movie_id, function(err, comments) {
      res.json(comments);
    });
  });
  app.post('/movie/:movie_id/comments', function(req, res){
    var user_id = req.body.user_id;
    postComment(req.params.movie_id, req.body.user_id, req.body.username, req.body.comment, function(err, comments) {
      console.log(comments);
      res.send(comments);
    });
  });
  //COMMENTS

  //REPLIES
  app.post('/movie/:movie_id/comments/:comment_id/replies', function(req, res){
    var newReply = req.body.item;
    postReply(req.params.movie_id, req.params.comment_id, req.body.user_id, req.body.username, newReply, function(err, replies) {
      console.log(replies);
      res.send(replies);
    });
  });
  //REPLIES

  //RATINGS
  app.get('/movie/:movie_id/ratings', function(req, res){
    getRatings(req.params.movie_id, function(err, ratings) {
      res.json(ratings);
    });
  });
  app.post('/movie/:movie_id/ratings', function(req, res) {
    var newRating = parseInt(req.body.score);
    postRating(req.params.movie_id, req.body.user_id, req.body.username, newRating, function(err, ratings) {
      console.log(ratings);
      res.send(ratings);
    });
  });
  //RATINGS

  //LIKES
  app.get('/movie/:movie_id/comments/:comment_id/likes', function(req, res){
    console.log(req.params.movie_id);
    console.log(req.params.comment_id);
    getLikes(req.params.movie_id, req.params.comment_id, function(numOfLikes) {
      console.log(numOfLikes);
      res.send(numOfLikes);
    });
  });
  app.post('/movie/:movie_id/comments/:comment_id/likes', function(req, res){
    postLike(req.params.movie_id, req.params.comment_id, function(err, numOfLikes) {
      console.log(numOfLikes);
      res.send(numOfLikes);
    });
  });
  //LIKES

  //DISLIKES
  app.post('/movie/:movie_id/comments/:comment_id/dislikes', function(req, res){
    postDislike(req.params.movie_id, req.params.comment_id, function(err, numOfDislikes) {
      console.log(numOfDislikes);
      res.send(numOfDislikes);
    });
  });
  app.get('/movie/:movie_id/comments/:comment_id/dislikes', function(req, res){
    getDislikes(req.params.movie_id, req.params.comment_id, function(numOfDislikes) {
      console.log(numOfDislikes);
      res.send(numOfDislikes);
    });
  });
  //DISLIKES

  app.post('/movie/:movie_id/purchase', function(req, res){
    if (req.user.balance < 499) {
      console.log('Payment required. You need to deposit funds into account');
      return res.status(402).send('Payment required');
    }
    purchaseMovie(req.params.movie_id, req.user, function(err, updatedUser) {
      //console.log(updatedUser);
      res.send(updatedUser);
    });

  });

}
