const db = require('../models/models')
const PDFDocument = require('pdfkit');

async function formulaireOrdonnance(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM ordonnance,traitement WHERE ordonnance.id=traitement.idOrdonnance AND ordonnance.id=${id}`, (err,result) => {
            if (err) throw err;
            return resolve(result);
        })
    })
}

async function afficherOrdonnance(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM ordonnance,traitement,patients WHERE ordonnance.id=traitement.idOrdonnance AND ordonnance.idPatient=patients.id AND ordonnance.id=${id}`,(err,result) => {
            if (result != "") {
                return resolve(result)
            } else {
                return resolve("")
            }
        })
    })
}

async function ajouterOrdonnance(date,prenom,nom,maladie,id) {
    db.query(`INSERT INTO ordonnance (date,nomMedecin,prenomMedecin,maladie,idPatient) VALUES ('${date}','${prenom}','${nom}','${maladie}',${id})`,(err,result) => {
        if (err) throw err;
    })
}

async function modifierOrdonnance(date,nomMedecin,prenomMedecin,maladie,id) {
    db.query(`UPDATE ordonnance SET date='${date}',nomMedecin='${nomMedecin}',prenomMedecin='${prenomMedecin}',maladie='${maladie}' WHERE id=${id}`,(err,result) => {
        if (err) throw err;
    })
}

async function supprimerOrdonnance(id) {
    db.query(`DELETE FROM ordonnance WHERE id=${id}`,(err,result) => {
        if (err) throw err;
    })
}

module.exports = {
    formulaireOrdonnance,
    afficherOrdonnance,
    ajouterOrdonnance,
    modifierOrdonnance,
    supprimerOrdonnance
}