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

function dateUS_toFR(date) {
    date = date.toString().split(" ")
    return date[2] + " " + date[1] + " " + date[3]
}
function formatTelephone(num) {
    num = num.toString().split("")
    for (let i = 1; i < num.length; i = i + 2) {
        num[i] = " "+num[i]
    }
    num.unshift(0)
    return num.join("")
}

app.get("/", (req,res) => {
    res.render("index.ejs")
})

app.get("/views/index.ejs",(req,res) => {
    res.render("index.ejs")
})

app.get("/views/liste.ejs",(req,res) => {
    db.query("SELECT * FROM patients",(err,result) => {
        res.render("liste.ejs", { result: result })
    })
})

app.post("/views/liste.ejs",(req,res) => {
    if (req.body.nom == "") {
        db.query("SELECT * FROM patients",(err,result) => {
            for (let i = 0; i < result.length; i++) {result[i].telephone = formatTelephone(result[i].telephone)}
            res.render("liste.ejs", { result: result })
        })
    } else {
        db.query(`SELECT * FROM patients WHERE nom LIKE '%${req.body.nom}%' OR prenom LIKE '%${req.body.nom}%'`,(err,result) => {
            if (err) throw err;
            if (result != "") {
                result[0].telephone = formatTelephone(result[0].telephone)
                res.render("liste.ejs", { result: result })
            } else {
                res.redirect("/views/index.ejs")
            }
        })
    }
})

app.get("/views/informations.ejs/:id",(req,res) => {
    db.query(`SELECT * FROM patients WHERE id=${req.params.id}`,(err,result) => {
        if (result != "") {
            result[0].DateDeNaissance = dateUS_toFR(result[0].DateDeNaissance)
            res.render("informations.ejs", { result: result })
        } else {
            res.render("informations.ejs", { result: "" })
        }
    })
})

app.get("/views/stock.ejs",(req,res)=> {
    db.query("SELECT Nom,Quantité FROM stock",(err,result) => {
        res.render("stock.ejs",{ result: result })
    })
})

app.listen(port, () => {
    console.log('Ecoute du port ' + port)
});