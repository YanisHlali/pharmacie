const db = require('../models/models')

async function creerPatient(nom,prenom,sexe,dateDeNaissance,telephone,adresse,email,numSecuSocial) {
    return new Promise((resolve,reject) => {
        let requete = `INSERT INTO patients (nom,prenom,sexe,dateDeNaissance,telephone,adresse,email,numSecuSocial) VALUES (`
        requete += `'${nom}','${prenom}','${sexe}','${dateDeNaissance}',${telephone},'${adresse}','${email}',${numSecuSocial})`;
        db.query(requete,(err,result) => {
            if (err) throw err;
            return resolve(result)
        })
    })
}

async function afficherPatient(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM patients,ordonnance WHERE patients.id=ordonnance.idPatient AND patients.id=${id}`,(err,result) => {
            if (err) throw err;
            if (result != "") {
                return resolve(result)
            } else {
                db.query(`SELECT * FROM patients WHERE id=${id}`,(err,result) => {
                    if (err) throw err;
                    if (result != "") {
                        return resolve(result)
                    } else {
                        return ""
                    }
                })
            }
        })
    })
}

async function modifierPatientFormulaire(id) {
    return new Promise ((resolve,reject) => {
        db.query(`SELECT * FROM patients WHERE id=${id}`,(err,result) => {
            return resolve(result)
        })
    })
}

async function modifierPatient(nom,prenom,sexe,dateDeNaissance,telephone,adresse,email,numSecuSocial,id) {
    db.query(`UPDATE patients SET nom='${nom}', prenom='${prenom}', sexe='${sexe}', dateDeNaissance='${dateDeNaissance}',`+
    `telephone=${telephone},adresse='${adresse}',email='${email}',numSecuSocial=${numSecuSocial} WHERE id=${id}`,(err,result) => {
        if (err) throw err;
    })
}

async function verifierOrdonnance(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT id FROM ordonnance WHERE idPatient=${id}`,(err,result) => {
            if (err) throw err;
            return resolve(result)
        })
    })
}

async function verifierTraitement(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT id FROM traitement WHERE idOrdonnance=${id}`,(err,result) => {
            if (err) throw err;
            return resolve(result)
        })
    })
}

async function supprimerPatient(id) {
    return new Promise ((resolve,reject) => {
        db.query(`DELETE FROM patients WHERE id=${id}`,(err,result) => {
            return resolve(result);
        })
    })
}

module.exports = {
    creerPatient,
    afficherPatient,
    modifierPatientFormulaire,
    modifierPatient,
    verifierOrdonnance,
    verifierTraitement,
    supprimerPatient
}