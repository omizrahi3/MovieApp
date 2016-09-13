var User = require('./../Models/User.model');

function requireLogin(req, res, next) {
  if (!req.user) {
    req.session.reset();
    res.redirect('/');
  }
  else next();
}

module.exports = function(app) {

  app.get('/dashboard', requireLogin, function(req, res){
    res.locals.title = 'dashboard';
    res.render('dashboard');
  });

}
