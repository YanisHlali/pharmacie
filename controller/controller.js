const db = require('../models/models')
const PDFDocument = require('pdfkit');

db.connect(function(err) {
    if (err) throw err
    console.log("Connecté à la base de données MySQL!")
});

function formatTelephone(num) {
    num = num.toString().split("")
    for (let i = 1; i < num.length; i = i + 2) {
        num[i] = " "+num[i]
    }
    num.unshift(0)
    return num.join("")
}

const index = (req,res) => {
    res.render("index.ejs")
}

const listeGET = (req,res) => {
    db.query("SELECT * FROM patients",(err,result) => {
        res.render("liste.ejs", { result: result })
    })
}

const listePOST = (req,res) => {
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
}

const informationsGET = (req,res) => {
    let requete = `SELECT * FROM patients,ordonnance WHERE patients.id=ordonnance.idPatient AND patients.id=${req.params.id}`
    db.query(requete,(err,result) => {
        if (result != "") {
            res.render("informations.ejs", { result: result })
        } else {
            db.query(`SELECT * FROM patients WHERE id=${req.params.id}`,(err,result) => {
                if (result != "") {
                    res.render("informations.ejs", { result: result })
                } else {
                    res.render("informations.ejs", { result: "" })
                }
            })
        }
    })
}

const informationsPOST = (req,res) => {
    if (req.body.date && req.body.nom && req.body.prenom && req.body.maladie) {
        let requete = `INSERT INTO ordonnance (date,nomMedecin,prenomMedecin,maladie,idPatient) VALUES ('${req.body.date}','${req.body.prenom}','${req.body.nom}','${req.body.maladie}',${req.params.id})`
        db.query(requete,(err,result) => {
            if (err) throw err;
            res.redirect("/views/informations.ejs/"+req.params.id)
        })
    } else {
        let requete = `INSERT INTO traitement (medicament,dosage,durée,quantite,renouvellement,idOrdonnance) VALUES ('${req.body.medicament}',${req.body.dosage},${req.body.duree},${req.body.quantite},${req.body.renouvellement},${req.body.numOrdonnance})`
        db.query(requete,(err,result) => {
            if (err) throw err;
            res.redirect("/views/informations.ejs/"+req.params.id)
        })
    }
}

const ordonnance = (req,res) => {
    db.query(`SELECT * FROM ordonnance,traitement,patients WHERE ordonnance.id=traitement.idOrdonnance AND ordonnance.id=${req.params.id}`,(err,result) => {
        const doc = new PDFDocument();

        doc
        .fontSize(15)
        .text(result[0].nomMedecin,50,50)
        .text(result[0].prenomMedecin,100,50)
        .text(result[0].prenom+" "+result[0].nom,400,125)
        .text("Le "+result[0].date,400,175)
        console.log(result)
        let j = 0
        for (let i = 0; i < result.length; i++) {
            doc.text(result[i].medicament+" - "+result[i].quantite + " boites",100,225+j)
            doc.text(result[i].dosage+" comprimés pendant "+result[i].durée+" mois",100,250+j)
            doc.text("A renouveller "+result[i].renouvellement+" fois",100,275+j)
            j = j + 100
        }
        doc.pipe(res)
        doc.end()
    })
}

const stock = (req,res) => {
    db.query("SELECT Nom,Quantité FROM stock",(err,result) => {
        res.render("stock.ejs",{ result: result })
    })
}

const nouveauGET = (req,res) => {
    res.render("nouveau.ejs");
}

const nouveauPOST = (req,res) => {
    let requete = "INSERT INTO patients (nom,prenom,sexe,dateDeNaissance,telephone,adresse,email,numSecuSocial) VALUES (";
    requete += `'${req.body.nom}','${req.body.prenom}','${req.body.sexe}','${req.body.dateDeNaissance}',${req.body.telephone},`;
    requete += `'${req.body.adresse}','${req.body.email}',${req.body.numSecuSocial})`;

    db.query(requete,(err,result) => {
        if (err) throw err;
    })
    res.redirect("/views/index.ejs")
}
module.exports = {
    index,
    listeGET,
    listePOST,
    informationsGET,
    informationsPOST,
    ordonnance,
    stock,
    nouveauGET,
    nouveauPOST
}