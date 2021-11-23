const express = require("express")
const routeur = express.Router();
const indexControle = require('../controller/indexController.js')
const ordonnanceControle = require('../controller/ordonnanceController.js')
const traitementControle = require('../controller/traitementController.js')
const stockControle = require('../controller/stockController.js')

routeur.get('/',indexControle.index)
.get('/views/index.ejs',indexControle.index)
// Stock
.get('/stock',stockControle.stock)
module.exports = routeur