const db = require('../models/models')

async function affichageListe() {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM patients ORDER BY nom`,(err,result) => {
            if (err) throw err;
            return resolve(result)
        })
    })
}

async function rechercheListe(nom) {
    return new Promise((resolve,reject) => {
        let requete = `SELECT * FROM patients WHERE nom LIKE '%${nom}%'`
        if (nom == "") {
            requete = "SELECT * FROM patients ORDER BY nom"
        }
        db.query(requete,(err,result) => {
            if (err) throw err;
            return resolve(result)
        })
    })
}

module.exports = {
    affichageListe,
    rechercheListe
}