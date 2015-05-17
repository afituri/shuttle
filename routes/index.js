var express = require('express');
var router = express.Router();
var travelerMgr = require('../app/traveler').travelerMgr;
var helpers = require('../app/helpers');
var login = require('../app/login')(router);
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET register page. */
router.get('/register', function(req, res) {
  res.render('register', { title: 'Express' });
});

/* Register a new traveler*/
router.post('/register', function(req, res) {
  /*check if email or username exists*/
  helpers.checkTraveler(req.body.username,req.body.email,function(result){
    if(result){
      helpers.register(req.body,function(result){
        res.render('login', { title: 'Express' });
      });
    } else {
      res.render('register', { title: 'Express' });
    }
  });
});

/* GET login page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
