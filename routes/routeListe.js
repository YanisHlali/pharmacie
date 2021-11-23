const express = require("express")
const routeur = express.Router();
const listeControle = require('../controller/listeController.js')

routeur
.get('/',listeControle.affichageListe)
.post('/',listeControle.rechercheListe)

module.exports = routeur