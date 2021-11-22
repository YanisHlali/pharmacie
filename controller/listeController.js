const listeDB = require('../models/listeModels')

function formatTelephone(num) {
    num = num.toString().split("")
    for (let i = 1; i < num.length; i = i + 2) {
        num[i] = " "+num[i]
    }
    num.unshift(0)
    return num.join("")
}

const affichageListe = async (req,res) => {
    let result = await listeDB.affichageListe()
    for (let i = 0; i < result.length; i++) {result[i].telephone = formatTelephone(result[i].telephone)}
    res.render("liste.ejs", { result: result })
}

const rechercheListe = async (req,res) => {
    let result = await listeDB.rechercheListe(req.body.nom)
    for (let i = 0; i < result.length; i++) {result[i].telephone = formatTelephone(result[i].telephone)}
    res.render("liste.ejs", { result: result })
}

module.exports = {
    affichageListe,
    rechercheListe
}