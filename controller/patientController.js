const db = require("../models/models");
const patientDB = require("../models/patientModels");
const traitementDB = require("../models/traitementModels");
const ordonnanceDB = require("../models/ordonnanceModels");

function formatTelephone(num) {
  num = num.toString().split("");
  for (let i = 1; i < num.length; i = i + 2) {
    num[i] = " " + num[i];
  }
  num.unshift(0);
  return num.join("");
}
const formulairePatient = (req, res) => {
  res.render("nouveau.ejs", { etat: "" });
};

async function creerPatient(req, res) {
  await patientDB.creerPatient(
    req.body.nom,
    req.body.prenom,
    req.body.sexe,
    req.body.dateDeNaissance,
    req.body.telephone,
    req.body.adresse,
    req.body.email,
    req.body.numSecuSocial
  );
  res.redirect("/views/index.ejs");
}

async function afficherPatient(req, res) {
  let result = await patientDB.afficherPatient(req.params.id);
  for (let i = 0; i < result.length; i++) {
    result[i].telephone = formatTelephone(result[i].telephone);
  }
  res.render("informations.ejs", { result: result });
}

async function modifierPatientFormulaire(req, res) {
  let result = await patientDB.modifierPatientFormulaire(req.params.id);
  res.render("nouveau.ejs", { result: result, etat: "modifier" });
}

async function modifierPatient(req, res) {
  await patientDB.modifierPatient(
    req.body.nom,
    req.body.prenom,
    req.body.sexe,
    req.body.dateDeNaissance,
    req.body.telephone,
    req.body.adresse,
    req.body.email,
    req.body.numSecuSocial,
    req.params.id
  );
  res.redirect(`/patient/${req.params.id}`);
}

async function supprimerPatient(req, res) {
  let ordonnance = await patientDB.verifierOrdonnance(req.params.id);
  if (ordonnance != "") {
    let traitement = await patientDB.verifierTraitement(ordonnance[0].id);
    if (traitement != "") {
      await traitementDB.supprimerTraitement(traitement[0].id);
      await ordonnanceDB.supprimerOrdonnance(ordonnance[0].id);
    }
  }
  await patientDB.supprimerPatient(req.params.id);
  res.redirect("/liste");
}

module.exports = {
  formulairePatient,
  creerPatient,
  afficherPatient,
  modifierPatientFormulaire,
  modifierPatient,
  supprimerPatient,
};
