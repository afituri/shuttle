var express = require('express');
var router = express.Router();
var travelerMgr = require('../app/traveler').travelerMgr;
var helpers = require('../app/helpers');
var login = require('../app/login')(router);
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/world', function(req, res) {
  var obj=[ {latLng: [51.507351, -0.127758], name: 'London'},
        {latLng: [41.385064, 2.173403], name: 'Barcelona'},
        {latLng: [40.712784, -74.005941], name: 'New York'},
        {latLng: [-22.911632, -43.188286], name: 'Rio De Janeiro'},
        {latLng: [49.282729, -123.120738], name: 'Vancuver'},
        {latLng: [35.689487, 139.691706], name: 'Tokio'},
        {latLng: [55.755826, 37.617300], name: 'Moskva'},
        {latLng: [43.214050, 27.914733], name: 'Varna'},
        {latLng: [30.044420, 31.235712], name: 'Cairo'} ];

   // console.log(obj);
  res.render('world', { title: 'Express',c:obj});
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
