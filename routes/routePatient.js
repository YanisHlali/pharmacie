const express = require("express");
const routeur = express.Router();
const patientControle = require('../controller/patientController.js');

routeur
.get('/patient/formulaire',patientControle.formulairePatient)
.post('/patient/formulaire',patientControle.creerPatient)
.get('/patient/:id',patientControle.afficherPatient)
.get('/patient/modifierPatient/:id',patientControle.modifierPatientFormulaire)
.post('/patient/modifierPatient/:id',patientControle.modifierPatient)
.get('/patient/supprimerPatient/:id',patientControle.supprimerPatient)

module.exports = routeur