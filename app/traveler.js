var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');

exports.travelerMgr = {
  addTraveler : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `traveler` SET ?',  body,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(body.name); 
        }
      });
    });
  },

  checkEmail : function(email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `stat` FROM `traveler` WHERE `email` = ? ',  email,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  register : function(body,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('INSERT INTO `traveler` SET ?',  body,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(true);
        }
      });
    });
  },

  checkAccount : function(code,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `stat`, `email` FROM `traveler` WHERE `md5activation` = ? ',  code,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  checkUsername : function(username,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `stat` FROM `traveler` WHERE `username` = ? ',  username,  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  activate : function(body,email,cb){
    mysqlMgr.connect(function (conn) {
      conn.query('UPDATE `traveler` SET ? WHERE `email` = ?',  [body,email],  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(true); 
        }
      });
    });
  },
  getTraveler : function(username,cb) {
    mysqlMgr.connect(function (conn){
      conn.query('SELECT * FROM `traveler` WHERE (`email`= ?) OR (`username` = ?)',[username,username],function(err,result) {
        conn.release();
        if(err) {
        util.log(err);
        } else {
          cb(result[0]);
        }
      });
    });
  },
  getTravelerById : function(id,cb) {
    mysqlMgr.connect(function (conn){
      conn.query('SELECT * FROM `traveler` WHERE `idtraveler`= ? ',id,function(err,result) {
        conn.release();
        if(err) {
        util.log("mysql lib err "+err);
        } else {
          cb(result[0]);
        }
      });
    });
  }
};