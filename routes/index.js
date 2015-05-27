var express = require('express');
var router = express.Router();
var travelerMgr = require('../app/traveler').travelerMgr;
var locationMgr = require('../app/location').locationMgr;
var helpers = require('../app/helpers');
var login = require('../app/login')(router);
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express',login : true });
});

router.get('/getCity/search', function(req, res) {
  //console.log(req.query.key);
  locationMgr.getCity(req.query.key,function(result){
    res.send(result);
  })
  //console.log(req.query.term);
});

router.get('/showing_trips', function(req, res) {
  res.render('showing_trips', { title: 'Express' });
});
router.get('/world', function(req, res) {
  var obj=[ {latLng: [51.507351, -0.127758], name: 'London(11↑,22↓)'},
        {latLng: [41.385064, 2.173403], name: 'Barcelona(10↑,20↓)'},
        {latLng: [40.712784, -74.005941], name: 'New York(10↑,20↓)'},
        {latLng: [-22.911632, -43.188286], name: 'Rio De Janeiro(10↑,20↓)'},
        {latLng: [49.282729, -123.120738], name: 'Vancuver(10↑,20↓)'},
        {latLng: [35.689487, 139.691706], name: 'Tokio(10↑,20↓)'},
        {latLng: [55.755826, 37.617300], name: 'Moskva(10↑,20↓)'},
        {latLng: [43.214050, 27.914733], name: 'Varna(10↑,20↓)'},
        {latLng: [30.044420, 31.235712], name: 'Cairo(10↑,20↓)'} ];
  res.render('world', { title: 'Express',c:obj});
});

router.get('/city:id', function(req, res) {
 // console.log(req.params.id);
  res.render('city', { title: 'Express',login : false });
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

/* New Trip page. */
router.get('/newTrip', function(req, res) {
  locationMgr.getCountries(function(result){
    res.render('newTrip', { title: 'Shuttle.LY | New Trip',countries:result});
  });
  
});

router.get('/getCities/:iso/:state', function(req, res) {
  console.log(req.params.iso);
  locationMgr.getCities(req.params.iso,req.params.state,function(result){
    res.send(result);
  });
});

router.get('/getStates/:iso', function(req, res) {
  locationMgr.getStates(req.params.iso,function(result){
    res.send(result);
  });
});

module.exports = router;
