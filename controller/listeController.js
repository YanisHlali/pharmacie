// Modèle de la liste
const listeDB = require('../models/listeModels')
// Convertit une suite de chiffre en format de numéro de téléphone
function formatTelephone(num) {
    num = num.toString().split(""); // Couple la chaîne de caractères
    for (let i = 1; i < num.length; i = i + 2) {
        num[i] = " "+num[i]; // Ajoute un espace tous les deux chiffres
    }
    num.unshift(0);
    return num.join("");
}
// Affiche la liste des patients
async function affichageListe (req,res) {
    // Récupère la liste
    let result = await listeDB.affichageListe();
    // Chaque numéro de téléphone est convertir dans un format de numéro de téléphone
    for (let i = 0; i < result.length; i++) {result[i].telephone = formatTelephone(result[i].telephone)}
    res.render("liste.ejs", { result: result });
}
// Cherche un patient
const rechercheListe = async (req,res) => {
    // Recupère le patient
    let result = await listeDB.rechercheListe(req.body.nom);
    // Chaque numéro de téléphone est convertir dans un format de numéro de téléphone
    for (let i = 0; i < result.length; i++) {result[i].telephone = formatTelephone(result[i].telephone)}
    res.render("liste.ejs", { result: result })
}
// Exporte les fonctions
module.exports = {
    affichageListe,
    rechercheListe
}