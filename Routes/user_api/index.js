var User = require('./../../Models/User.model');
var bcrypt = require('bcryptjs');
var stripe = require("stripe")(
  "sk_test_UEiTmglWSL3WHQUZmhCcts5K"
);

function addUserToDB(eml, usern, psw, callback) {
  var hash = bcrypt.hashSync(psw, bcrypt.genSaltSync(10));
  var addUser = new User({
    email: eml,
    username: usern,
    password: hash,
    balance: 2000
  });
  addUser.save(function(err, userSaved) {
    callback(err, userSaved)
  });
}

function getUser(em, psw, callback) {
  var error;
  var user_return;
  User.findOne({email: em}, function(err, user) {
    if (err) {
      console.log(err);
      callback(err, user);
    }
    if(!user) {
      error = "user does not exist";
    }
    else if (!bcrypt.compareSync(psw, user.password)) {
      error = "incorrect password";
    }
    callback(error, user);
  })
}


module.exports = function(app) {

  app.post('/register', function(req, res){
    addUserToDB(req.body.email, req.body.username, req.body.password, function(err, user) {
      if (err) {
        if (err.code === 11000) res.json("email already exists");
        else res.json("could not save");
      }
      else res.json(user.username);
    });
  });

  app.post('/login', function(req, res){
    getUser(req.body.email, req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      else {
        req.session.user = user;
        res.status(200).send(user);
      }
    });
  });

  app.post('/charge', function(req, res){
    stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        source: req.body.stripeToken,
        description: 'One time deposit for ' + req.user.email + '.'
      }, function(err, charge) {
        if (err) return next(err);
        req.user.balance += charge.amount;
        req.user.save(function(err) {
          if (err) return next(err);
          res.redirect('/dashboard');
        });
    });
  });

}
