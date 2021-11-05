const express = require("express")
const routeur = express.Router();
const controle = require('../controller/controller.js')

routeur.get('/',controle.index)
.get('/views/index.ejs',controle.index)
.get('/views/liste.ejs',controle.listeGET)
.post('/views/liste.ejs',controle.listePOST)
.get('/views/informations.ejs/:id',controle.informationsGET)
.post('/views/informations.ejs/:id/ordonnance',controle.informationsPOST)
.get('/views/informations.ejs/ordonnance/:id',controle.ordonnance)
.get('/views/stock.ejs',controle.stock)
.get('/views/nouveau.ejs',controle.nouveauGET)
.post('/views/nouveau.ejs',controle.nouveauPOST)
module.exports = routeur