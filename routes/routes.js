const express = require("express")
const routeur = express.Router();
const indexControle = require('../controller/indexController.js')
const ordonnanceControle = require('../controller/ordonnanceController.js')
const traitementControle = require('../controller/traitementController.js')
const stockControle = require('../controller/stockController.js')

routeur.get('/',indexControle.index)
.get('/views/index.ejs',indexControle.index)
// Ordonnance
// Traitement
.get('/views/informations.ejs/ajoutTraitement/:id',traitementControle.formulaireTraitement)
.post('/ordonnance/ajoutTraitement/:id',traitementControle.ajouterTraitement)
.get('/views/informations.ejs/modifierOrdonnance/:id',traitementControle.lireTraitement)
.post('/views/informations.ejs/modifierTraitement/:idOrdonnance/:idTraitement',traitementControle.modifierTraitement)
.get('/views/informations.ejs/supprimerTraitement/:idOrdonnance/:idTraitement',traitementControle.supprimerTraitement)
// Stock
.get('/views/stock.ejs',stockControle.stock)
module.exports = routeur