// Affiche la page d'accueil
async function index (req,res) {
    res.render("index.ejs")
}
// Exporte les fonctions
module.exports = {
    index
}