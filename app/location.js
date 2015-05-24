
var mysqlMgr = require('./mysql').mysqlMgr,
    util=require('util');

exports.locationMgr = {

  getCountries : function(cb){
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `id`,`iso`, `local_name` FROM `country` WHERE `type` = "CO" ORDER BY `local_name`',  function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },
  getCities : function(iso,cb){
    console.log(iso);
    iso+="%";
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `id`, `local_name` FROM `location` WHERE `iso` LIKE ?   ORDER BY `local_name`', iso, function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  getCity : function(term,cb){
    term = term+"%";
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT  `location`.`id` AS  idcity,`location`.`local_name` AS lname,`country`.`local_name` AS country FROM `location`,`country` WHERE `location`.`local_name` LIKE ? AND (`location`.`type` = "CI" OR `location`.`type` = "RE") AND ( LEFT(`location`.`iso`,2) = `country`.`iso` OR LEFT(`location`.`iso`,5) = `country`.`iso`) limit 10', term, function(err, rows, fields) {
      conn.release();
      if (err) throw err;
        var data=[];
        for(i=0;i<rows.length;i++){
            data.push({id:rows[i].idcity,name:rows[i].lname+"-"+rows[i].country});
            //data.push(rows[i].lname+"-"+rows[i].country);
        }
        cb(JSON.stringify(data));
      });
    });
  },

  getUsCities : function(state,cb){
    console.log(state);
    state ="%US-"+state+"%";
    mysqlMgr.connect(function (conn) {
      conn.query('SELECT `id`, `local_name` FROM `location` WHERE `iso` LIKE ? AND (`type` = "CI" )   ORDER BY `local_name`', state, function(err, result) {
        conn.release();
        if(err) {
          util.log(err);
        } else {
          cb(result);
        }
      });
    });
  },

  // getStates : function(cb){
  //   mysqlMgr.connect(function (conn) {
  //     conn.query('SELECT DISTINCT(`state`) FROM `uscities` ',  function(err, result) {
  //       conn.release();
  //       if(err) {
  //         util.log(err);
  //       } else {
  //         cb(result);
  //       }
  //     });
  //   });
  // },

}
