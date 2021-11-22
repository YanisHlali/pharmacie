const express = require("express");
const routeur = express.Router();
const ordonnanceControle = require('../controller/ordonnanceController.js');

routeur
.post('/patient/:id/ajouterOrdonnance',ordonnanceControle.ajouterOrdonnance)
.get('/ordonnance/:id',ordonnanceControle.afficherOrdonnance)
.get('/ordonnance/modifierOrdonnance/:id',ordonnanceControle.formulaireOrdonnance)
.post('/ordonnance/modifierOrdonnance/:id',ordonnanceControle.modifierOrdonnance)
.get('/ordonnance/supprimerOrdonnance/:id',ordonnanceControle.supprimerOrdonnance)

module.exports = routeur