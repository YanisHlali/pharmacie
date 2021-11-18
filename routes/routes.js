const express = require("express")
const routeur = express.Router();
const controle = require('../controller/controller.js')

routeur.get('/',controle.index)
.get('/views/index.ejs',controle.index)
.get('/views/liste.ejs',controle.listeGET)
.post('/views/liste.ejs',controle.listePOST)
.get('/views/informations.ejs/modifierPatient/:id',controle.modifierPatientGET)
.post('/views/informations.ejs/modifierPatient/:id',controle.modifierPatientPOST)
.get('/views/informations.ejs/supprimerPatient/:id',controle.supprimerPatient)
.get('/views/informations.ejs/:id',controle.informationsGET)
.post('/views/informations.ejs/:id/ordonnance',controle.informationsPOST)
.post('/views/informations.ejs/modifierOrdonnance/:id',controle.modifierOrdonnance)
.get('/views/informations.ejs/ordonnance/:id',controle.ordonnance)
.get('/views/informations.ejs/ajoutTraitement/:id',controle.ajoutTraitementGET)
.post('/views/informations.ejs/ajoutTraitement/:id',controle.ajoutTraitementPOST)
.get('/views/informations.ejs/modifierOrdonnance/:id',controle.modifierTraitementGET)
.post('/views/informations.ejs/modifierTraitement/:id/:idTraitement',controle.modifierTraitementPOST)
.get('/views/informations.ejs/supprimerTraitement/:id',controle.supprimerTraitement)
.get('/views/informations.ejs/supprimerOrdonnance/:id',controle.supprimerOrdonnance)
.get('/views/stock.ejs',controle.stock)
.get('/views/nouveau.ejs',controle.nouveauGET)
.post('/views/nouveau.ejs',controle.nouveauPOST)
module.exports = routeur