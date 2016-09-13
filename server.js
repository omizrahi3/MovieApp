var express = require('express');
var bodyparser = require('body-parser');
var bcrypt = require('bcryptjs');
var router = require('./Routes');
var mongoose = require('mongoose');
var sessions = require('client-sessions');

var app = express();

app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;

/*
mongoose.connect('mongodb://localhost/**ADD DOC NAME HERE**');
*/

app.use(express.static('./public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(sessions({
  cookieName: 'session',
  //secret: '** ADD SECRET CODE HERE **',
  duration: 30 * 60* 1000,
  activeDuration: 5 * 60 * 1000,
}));

router(app);

app.listen(3000, function(){
  console.log('listening on port 3000');
});
