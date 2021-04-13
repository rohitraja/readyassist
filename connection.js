const mysql = require("mysql");
const config = require("./configs/redyassystConf");
let dbConfig = config.dbConf.master;
let connection = mysql.createConnection(dbConfig);

connection.connect(function(err){
    if(err){
        console.log("Error while DB connection: ", err);
        return;
    }
});

module.exports = connection;

