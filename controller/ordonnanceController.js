const ordonnanceDB = require("../models/ordonnanceModels");
const traitementDB = require('../models/traitementModels');
const patientDB = require("../models/patientModels");
const PDFDocument = require("pdfkit");

async function formulaireOrdonnance (req,res) {
  let result = await ordonnanceDB.formulaireOrdonnance(req.params.id);
  res.render("traitement.ejs", {result: result})
}

async function afficherOrdonnance(req, res) {
  let result = await ordonnanceDB.afficherOrdonnance(req.params.id);
  if (result != "") {
    const doc = new PDFDocument();

    doc
      .fontSize(15)
      .text(result[0].prenomMedecin + " " + result[0].nomMedecin, 50, 50)
      .text(result[0].prenom + " " + result[0].nom, 400, 125)
      .text("Le " + result[0].date, 400, 175);
    let j = 0;
    for (let i = 0; i < result.length; i++) {
      doc.text(
        result[i].medicament + " - " + result[i].quantite + " boites",
        100,
        225 + j
      );
      doc.text(
        result[i].dosage + " comprimés pendant " + result[i].duree + " mois",
        100,
        250 + j
      );
      doc.text(
        "A renouveller " + result[i].renouvellement + " fois",
        100,
        275 + j
      );
      j = j + 100;
    }
    doc.pipe(res);
    doc.end();
  } else {
    res.render("informations.ejs", { result: "" });
  }
}

async function ajouterOrdonnance(req, res) {
  await ordonnanceDB.ajouterOrdonnance(
    req.body.date,
    req.body.prenom,
    req.body.nom,
    req.body.maladie,
    req.params.id
  );
  res.redirect(`/patient/${req.params.id}`);
}

async function modifierOrdonnance (req, res) {
  await ordonnanceDB.modifierOrdonnance(
    req.body.date,
    req.body.nomMedecin,
    req.body.prenomMedecin,
    req.body.maladie,
    req.params.id
  );
  res.redirect(`/liste`);
};

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
  res.redirect("/views/liste.ejs");
}

async function supprimerOrdonnance (req, res) {
  let traitement = await patientDB.verifierTraitement(req.params.id);
  if (traitement != "") {
    for (let i = 0; i < traitement.length; i++) {
      await traitementDB.supprimerTraitement(traitement[i].id);
    }
  }
  await ordonnanceDB.supprimerOrdonnance(req.params.id);
  res.redirect("/liste");
};

module.exports = {
  formulaireOrdonnance,
  afficherOrdonnance,
  ajouterOrdonnance,
  modifierOrdonnance,
  supprimerOrdonnance,
};
