const express = require("express")
const mysql = require("mysql")

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/views'))
app.use(express.urlencoded({ extended: true}))

const db = mysql.createConnection({
    host: "mysql-yanishlali.alwaysdata.net",
    database: "yanishlali_pharmacie",
    user: "220794_marco",
    password: "M8iFV3m6d"
});
db.connect(function(err) {
    if (err) throw err
    console.log("Connecté à la base de données MySQL!")
});


app.get("/", (req,res) => {
    res.render("index.ejs")
})

app.get("/views/recherche.ejs",(req,res) => {
    res.render("recherche.ejs")
})

app.post("/views/recherche.ejs",(req,res) => {
    db.query("SELECT * FROM patients WHERE nom='"+req.body.nom+"'",(err,result) => {
        if (err) throw err;
        if (result != "") {
            console.log(result)
            res.render("recherche.ejs", { result: result})
        }
    })
})


app.listen(port, () => {
    console.log('Ecoute du port ' + port)
});