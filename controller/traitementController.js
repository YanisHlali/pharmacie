const traitementDB = require("../models/traitementModels");
const stockDB = require("../models/stockModels");

const formulaireTraitement = async (req, res) => {
  res.render("traitement.ejs", { result: "" });
};

async function ajouterTraitement (req, res) {
  let result = await stockDB.lireStock(req.body.medicament);
  if (result == "") await stockDB.ajouterStock(req.body.medicament);

  await traitementDB.ajouterTraitement(
    req.body.medicament,
    req.body.dosage,
    req.body.duree,
    req.body.quantite,
    req.body.renouvellement,
    req.params.id
  );
  res.render("traitement.ejs", { result: "" });
};

async function lireTraitement (req, res) {
  let result = await traitementDB.lireTraitement(req.params.id);
  res.render("traitement.ejs", { result: result });
};

async function modifierTraitement (req, res) {
  await traitementDB.modifierTraitement(req.body.medicament,
    req.body.dosage,
    req.body.duree,
    req.body.quantite,
    req.body.renouvellement,
    req.params.idOrdonnance,
    req.params.idTraitement)
  res.redirect("/views/index.ejs");
};

async function supprimerTraitement(req,res) {
  await traitementDB.supprimerTraitement(req.params.idTraitement);
  res.redirect("/liste");
};

module.exports = {
  formulaireTraitement,
  ajouterTraitement,
  lireTraitement,
  modifierTraitement,
  supprimerTraitement,
};
