const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models/models');

const Routeur = require('./routes/routes');
const RouteurListe = require('./routes/routeListe');
const RouteurPatients = require('./routes/routePatient');
const RouteurOrdonnance = require('./routes/routeOrdonnance');
const RouteurTraitement = require('./routes/routeTraitement');

app.set('view engine', 'ejs');

db.connect(function(err) {
    if (err) throw err
    console.log("Connecté à la base de données MySQL!")
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true}));

app.use('/', Routeur);
app.use('/liste',RouteurListe);
app.use('/',RouteurPatients);
app.use('/',RouteurOrdonnance);
app.use('/',RouteurTraitement);

app.listen(port, () => {
    console.log('Ecoute du port ' + port);
});