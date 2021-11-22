const mysql = require("mysql")

const db = mysql.createConnection({
    host: "mysql-yanishlali.alwaysdata.net",
    database: "yanishlali_pharmacie",
    user: "220794",
    password: "Nvci8R72P"
});


module.exports = db