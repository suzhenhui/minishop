const mysql = require("mysql")

var pool = mysql.createPool({
    host:"111.230.167.112",
    port:3306,
    user:"lukcy_jie",
    password: 'Djj2018@',
    database:'minishop',
    connectionlimit: 20 
})

module.exports = pool