const express = require("express")
const routeur = express.Router();
const traitementControle = require('../controller/traitementController.js');

routeur
.get('/traitement/ajouterTraitement/:id',traitementControle.formulaireTraitement)
.post('/traitement/ajouterTraitement/:id',traitementControle.ajouterTraitement)
.get('/ordonnance/modifierOrdonnance/:id',traitementControle.lireTraitement)
.post('/ordonnance/modifierTraitement/:idOrdonnance/:idTraitement',traitementControle.modifierTraitement)
.get('/ordonnance/supprimerTraitement/:idOrdonnance/:idTraitement',traitementControle.supprimerTraitement)

module.exports = routeur;