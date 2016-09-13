var User = require('./../Models/User.model');

function requireNoLogin(req, res, next) {
  if (req.user) {
    res.redirect('/');
  }
  else next();
}

module.exports = function(app) {

  app.get('/register', requireNoLogin, function(req, res){
    res.locals.title = 'register';
    res.render('register');
  });


}
