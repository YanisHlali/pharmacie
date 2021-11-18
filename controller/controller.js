const db = require('../models/models')
const PDFDocument = require('pdfkit');
const { render } = require('ejs');

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
    return null
}

const listeGET = (req,res) => {
    db.query("SELECT * FROM patients ORDER BY nom",(err,result) => {
        for (let i = 0; i < result.length; i++) {result[i].telephone = formatTelephone(result[i].telephone)}
        res.render("liste.ejs", { result: result })
    })
}

const listePOST = (req,res) => {
    if (req.body.nom == "") {
        db.query("SELECT * FROM patients ORDER BY nom",(err,result) => {
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

const modifierPatientGET = (req,res) => {
    db.query(`SELECT * FROM patients WHERE id=${req.params.id}`,(err,result) => {
        res.render('nouveau.ejs', {result: result, etat: 'modifier'})
    })
}

const modifierPatientPOST = (req,res) => {
    let requete = `UPDATE patients SET nom='${req.body.nom}', prenom='${req.body.prenom}', sexe='${req.body.sexe}', dateDeNaissance='${req.body.dateDeNaissance}',`
    requete += `telephone=${req.body.telephone},adresse='${req.body.adresse}',email='${req.body.email}',numSecuSocial=${req.body.numSecuSocial} `
    requete += `WHERE id=${req.params.id}`
    db.query(requete,(err,result) => {
        if (err) throw err;
        res.redirect('/views/index.ejs')
    })
}

const supprimerPatient = (req,res) => {
    db.query(`DELETE FROM patients WHERE id=${req.params.id}`,(err,result) => {
        if (err) throw err;
        res.redirect('/views/liste.ejs')
    })
}

const informationsGET = (req,res) => {
    let requete = `SELECT * FROM patients,ordonnance WHERE patients.id=ordonnance.idPatient AND patients.id=${req.params.id}`
    db.query(requete,(err,result) => {
        if (result != "") {
            for (let i = 0; i < result.length; i++) {result[i].telephone = formatTelephone(result[i].telephone)}
            res.render("informations.ejs", { result: result })
        } else {
            db.query(`SELECT * FROM patients WHERE id=${req.params.id}`,(err,result) => {
                if (result != "") {
                    for (let i = 0; i < result.length; i++) {result[i].telephone = formatTelephone(result[i].telephone)}
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

const modifierOrdonnance = (req,res) => {
    let requete = `UPDATE ordonnance SET date='${req.body.date}',nomMedecin='${req.body.nomMedecin}',`
    requete += `prenomMedecin='${req.body.prenomMedecin}',maladie='${req.body.maladie}' WHERE id=${req.params.id}`
    db.query(requete,(err,result) => {
        if (err) throw err;
        res.redirect("/views/liste.ejs")
    })
}

const ordonnance = (req,res) => {
    db.query(`SELECT * FROM ordonnance,traitement,patients WHERE ordonnance.id=traitement.idOrdonnance AND ordonnance.idPatient=patients.id AND ordonnance.id=${req.params.id}`,(err,result) => {
        if (result != "") {
            const doc = new PDFDocument();

            doc
            .fontSize(15)
            .text(result[0].prenomMedecin+" "+result[0].nomMedecin,50,50)
            .text(result[0].prenom+" "+result[0].nom,400,125)
            .text("Le "+result[0].date,400,175)
            let j = 0
            for (let i = 0; i < result.length; i++) {
                doc.text(result[i].medicament+" - "+result[i].quantite + " boites",100,225+j)
                doc.text(result[i].dosage+" comprimés pendant "+result[i].duree+" mois",100,250+j)
                doc.text("A renouveller "+result[i].renouvellement+" fois",100,275+j)
                j = j + 100
            }
            doc.pipe(res)
            doc.end()
        } else {
            db.query(`SELECT * FROM ordonnance,patients WHERE ordonnance.idPatient=patients.id AND ordonnance.id=2${req.params.id}`)
            res.render("informations.ejs",{ result: "" })
        }
    })
}

const ajoutTraitementGET = (req,res) => {
    res.render("traitement.ejs", {result: ""})
}

const ajoutTraitementPOST = (req,res) => {
    let requete = `INSERT INTO traitement (medicament,dosage,duree,quantite,renouvellement,idOrdonnance) VALUES ('${req.body.medicament}',${req.body.dosage},${req.body.duree},${req.body.quantite},${req.body.renouvellement},${req.params.id})`
    db.query(requete,(err,result) => {
        if (err) throw err;
        res.render("traitement.ejs", {result: ""})
    })
}

const modifierTraitementGET = (req,res) => {
    db.query(`SELECT * FROM ordonnance,traitement WHERE ordonnance.id=traitement.idOrdonnance AND ordonnance.id=${req.params.id}`, (err,result) => {
        if (result != "") {
            console.log(result)
            res.render("traitement.ejs", {result: result})
        } else {
            res.render("traitement.ejs", {result: ""})
        }
    })
}

const modifierTraitementPOST = (req,res) => {
    let requete = `UPDATE traitement SET medicament='${req.body.medicament}',dosage=${req.body.dosage},`
    requete += `duree=${req.body.duree},quantite=${req.body.quantite},renouvellement=${req.body.renouvellement},`
    requete += `idOrdonnance=${req.params.id} WHERE id=${req.params.idTraitement}`
    db.query(requete,(err,result) => {
        if (err) throw err;
        res.redirect('/views/index.ejs')
    })
}

const supprimerTraitement = (req,res) => {
    db.query(`DELETE FROM traitement WHERE idOrdonnance=${req.params.id}`,(err,result) => {
        if (err) throw err;
        res.redirect('/views/liste.ejs')
    })
}

const supprimerOrdonnance = (req,res) => {
    db.query(`DELETE FROM traitement WHERE idOrdonnance=${req.params.id}`,(err,result) => {
        if (err) throw err;
    })
    db.query(`DELETE FROM ordonnance WHERE id=${req.params.id}`,(err,result) => {
        if (err) throw err;
    })
    res.redirect('/views/liste.ejs')
}

const stock = (req,res) => {
    db.query("SELECT * FROM stock,traitement WHERE stock.nom=traitement.medicament",(err,result) => {
        console.log(result)
        let medicaments = []
        for (let i = 0; i < result.length; i++) {
            medicaments.push(result[i].medicament)
        }
        let quantite = []
        for (let i = 0; i < result.length; i++) {
            quantite.push(result[i].medicament)
            let quantiteAPush = []
            for (let j = 0; j < 6; j++) {
                quantiteAPush.push(result[i].quantiteStock-(result[i].quantite*j))
            }
            quantite.push(quantiteAPush)
        }
        console.log(quantite)
        res.render("stock.ejs",{ result: result, medicaments: medicaments, quantite: quantite })
    })
}

const nouveauGET = (req,res) => {
    res.render("nouveau.ejs", {etat: ""});
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
    modifierPatientGET,
    modifierPatientPOST,
    supprimerPatient,
    informationsGET,
    informationsPOST,
    modifierOrdonnance,
    ordonnance,
    ajoutTraitementGET,
    ajoutTraitementPOST,
    modifierTraitementGET,
    modifierTraitementPOST,
    supprimerTraitement,
    supprimerOrdonnance,
    stock,
    nouveauGET,
    nouveauPOST
}