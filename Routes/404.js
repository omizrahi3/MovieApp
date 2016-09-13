module.exports = function(app) {
  app.get('*', function(req, res){
    res.status(404).send('404 Page Not Found');
  });
}
