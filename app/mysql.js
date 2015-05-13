/************************************************************************/
var mysql = require('mysql');
var config = require('../config.json').sqlconfig;
var pool = mysql.createPool({
  host : config.host,
  user : config.user,
  password : config.password,
  database : config.database,
  multipleStatements: true
});
/************************************************************************/
exports.mysqlMgr = {
  connect : function (callback){
  pool.getConnection(function(err, connection) {
  callback(connection);
  });
},
}