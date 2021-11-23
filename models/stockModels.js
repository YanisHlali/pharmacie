const db = require('../models/models')

async function lireStock(medicament) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT nom FROM stock WHERE nom='${medicament}'`, (err,result) => {
            if (err) throw err
            return resolve(result)
        })
    })
}

async function ajouterStock(medicament) {
    return new Promise((resolve,reject) => {
        db.query(`INSERT INTO stock (nom,quantiteStock,seuilAlert) VALUES ('${medicament}',250,10)`,(err,result) => {
            if (err) throw err
            return resolve(result)
        })
    })
}

async function recupStock() {
    return new Promise((resolve,reject) => {
        db.query("SELECT * FROM stock,traitement WHERE stock.nom=traitement.medicament",(err,result) => {
            return resolve(result)
        })
    })
}
module.exports = {
    lireStock,
    ajouterStock,
    recupStock
}