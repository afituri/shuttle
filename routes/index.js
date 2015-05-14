var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET register page. */
router.get('/register', function(req, res) {
  res.render('register', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Express' });
});

module.exports = router;
