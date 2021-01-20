  
const mysql = require("mysql2")
require('dotenv').config()
    
const connection_mysql = mysql.createPool({
    host : process.env.DB_HOST, 
    user : process.env.DB_USER, 
    password : process.env.DB_PASS, 
    database : process.env.DB_DATABASE, 
    port : process.env.DB_PORT
})
const promiseConnection_mysql=connection_mysql.promise();
module.exports = {
    cnn_mysql : promiseConnection_mysql
}