var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    easyPbkdf2 = require("easy-pbkdf2")(),
    travelerMgr = require('../app/traveler').travelerMgr;


//read the passport api docs if you wanna know what this does
passport.use(new LocalStrategy(
  function(username, password, done) {
    findByEmail(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      authenticate(user,password, function(valid){
        if(valid){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  }
));
//read the passport api docs if you wanna know what this does
passport.serializeUser(function(user, done) {
  done(null, user.iduser);
});
//read the passport api docs if you wanna know what this does
passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = function (router) {
  //login here we get the email and password and check if they're conrrect
  router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    findById(req.session.passport.traveler, function (err, traveler) {
      req.session.email=traveler.email;
      req.session.iduser=traveler.idtraveler;
      req.session.stat=traveler.stat;
      req.session.username=traveler.username;
      req.session.gender=traveler.gender;
    });
  });
  // here if a user wants to logout of the app
  router.get('/logout',ensureAuthenticated, function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });

  /* Check if email already registered*/
  router.get('/checkEmail/:email', function(req, res) {
    travelerMgr.checkEmail(req.params.email, function(result){
      if(!result[0]){
        res.send(false);
      } else {
        res.send(result[0].status);
      }
    });
  });

  router.get('/checkUsername/:username', function(req, res) {
    travelerMgr.checkUsername(req.params.username, function(result){
      if(!result[0]){
        res.send(true);
      } else {
        res.send(false);
      }
    });
});
  return router;
}

function findById(id, fn) {
  travelerMgr.getTravelerById(id, function(user){
    if(user){
      fn(null, user);
    } else {
      fn(new Error('Traveler ' + id + ' does not exist'));
    }
  });
}
function findByEmail(username, fn) {
  travelerMgr.getTravelerByEmail(username, function(user){
    if(user) {
      return fn(null, user);
    } else {
      return fn(null, null);
    }
  });
}

function authenticate( user, userEnteredPassword, callback) {
  // make sure the user-entered password is equal to the previously
  // created hash when hashed with the same salt.
  easyPbkdf2.verify( user.salt, user.password, userEnteredPassword, function( err, valid ) {
      callback(valid);
  });
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}