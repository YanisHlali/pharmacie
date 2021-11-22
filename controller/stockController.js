const db = require('../models/models')
const stockDB = require('../models/stockModels')

const stock = async (req,res) => {
    let result = await stockDB.recupStock()
    let medicaments = []
    for (let i = 0; i < result.length; i++) {
        medicaments.push(result[i].medicament)
    }
    let quantite = []
    for (let i = 0; i < result.length; i++) {
        quantite.push(result[i].medicament)
        let quantiteAPush = []
        for (let j = 0; j < 6; j++) {
            quantiteAPush.push(result[i].quantiteStock-(result[i].quantite*j))
        }
        quantite.push(quantiteAPush)
    }
    res.render("stock.ejs",{ result: result, medicaments: medicaments, quantite: quantite })
}

module.exports = {
    stock
}