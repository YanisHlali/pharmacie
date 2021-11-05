const mysql = require("mysql")

const db = mysql.createConnection({
    host: "mysql-yanishlali.alwaysdata.net",
    database: "yanishlali_pharmacie",
    user: "220794_marco",
    password: "M8iFV3m6d"
});

module.exports = db