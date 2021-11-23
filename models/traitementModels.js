const db = require("../models/models");

async function ajouterTraitement(
  medicament,
  dosage,
  duree,
  quantite,
  renouvellement,
  id
) {
  db.query(
    `INSERT INTO traitement (medicament,dosage,duree,quantite,renouvellement,idOrdonnance) VALUES ` +
      `('${medicament}',${dosage},${duree},${quantite},${renouvellement},${id})`,
    (err, result) => {
      if (err) throw err;
    }
  );
}

async function lireTraitement(id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM ordonnance,traitement WHERE ordonnance.id=traitement.idOrdonnance AND ordonnance.id=${id}`,
      (err, result) => {
        if (err) throw err;
        return resolve(result);
      }
    );
  });
}

async function modifierTraitement(
  medicament,
  dosage,
  duree,
  quantite,
  renouvellement,
  idOrdonnance,
  idTraitement
) {
  db.query(
    `UPDATE traitement SET medicament='${medicament}',dosage=${dosage},duree=${duree},quantite=${quantite},` +
      `renouvellement=${renouvellement},idOrdonnance=${idOrdonnance} WHERE id=${idTraitement}`,(err, result) => {
          if (err) throw err;
      }
  );
}

async function supprimerTraitement(id) {
    db.query(`DELETE FROM traitement WHERE id=${id}`,(err,result) => {
        if (err) throw err;
    })
}

module.exports = {
  ajouterTraitement,
  lireTraitement,
  modifierTraitement,
  supprimerTraitement
};
