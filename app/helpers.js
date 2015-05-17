var geoip = require('geoip-lite');
var md5 = require('MD5');
var easyPbkdf2 = require("easy-pbkdf2")(),
    travelerMgr = require('../app/traveler').travelerMgr;

module.exports = {
  getLocationByIp : function(ip){
    var location = {
      city : geoip.lookup(ip).city,
      country : geoip.lookup(ip).country,
      region : geoip.lookup(ip).region
    }
    return location;
  },
  checkTraveler : function(username,email,cb){
    travelerMgr.checkEmail(email, function(result){
      if(!result[0]){
        travelerMgr.checkUsername(username, function(result){
          if(!result[0]){
            cb(true);
          } else {
            cb(false);
          }
        });
      } else {
        cb(false);
      }
    });
  },
  register : function(body,cb){
    var date = new Date(),
        md5activation = md5(body.email+date.toString()),
        salt = easyPbkdf2.generateSalt();
    easyPbkdf2.secureHash(body.password, salt, function( err, passwordHash, originalSalt ) {
      var obj={
            email : body.email,
            username : body.username,
            password : passwordHash,
            salt : originalSalt,
            gender : body.gender,
            md5activation : md5activation,
            stat : -1
          }
      travelerMgr.register(obj, function(result){
        if(result){
          cb(true);//register success
        } else {
          cb(false);//register fails 
        }
      });
    });
  }
};