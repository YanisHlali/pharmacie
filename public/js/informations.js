function creerElement(element,name,type,classe,placeholder) {
    element.setAttribute("name",name)
    element.setAttribute("type",type)
    element.setAttribute("class",classe)
    element.setAttribute("placeholder", placeholder)
    element.setAttribute("required","true")
    element.setAttribute("autocomplete","off")
    return element
}

function boutonOrdonnance(buttonOrdonnance) {
    buttonOrdonnance.addEventListener("click", function() {
        if (!document.getElementById("ordonnance")) {
            let ordonnance = document.createElement("div")
            ordonnance.setAttribute("class","container")
            ordonnance.setAttribute("id","ordonnance")

            let titre = document.createElement("h2")
            titre.innerHTML = "Ajout d'une ordonnance"
    
            let form = document.createElement("form")
            form.setAttribute("action",document.location.href+"/ordonnance")
            form.setAttribute("method","POST")
    
            let date = document.createElement("input")
            creerElement(date,"date","date","input","")
    
            let prenom = document.createElement("input")
            creerElement(prenom,"prenom","text","input","Prénom du medecin")
    
            let nom = document.createElement("input")
            creerElement(nom,"nom","text","input","Nom du medecin")
    
            let maladie = document.createElement("input")
            creerElement(maladie,"maladie","text","input","Maladie")
    
            let valider = document.createElement("input")
            creerElement(valider,"","submit","button","")

            let elements = [date,prenom,nom,maladie,valider];

            for (let i = 0; i < elements.length; i++) {
                let div = document.createElement("div")
                div.setAttribute("class","field")
                div.append(elements[i])
                form.append(div)
            }

            ordonnance.append(titre,form)
            document.body.append(ordonnance)
        } else {
            document.getElementById("ordonnance").remove()
        }
    })
}

function boutonTraitement(buttonTraitement) {
    buttonTraitement.addEventListener("click", function () {
        if (!document.getElementById("traitement")) {
            let traitement = document.createElement("div")
            traitement.setAttribute("class","container")
            traitement.setAttribute("id","traitement")

            let form = document.createElement("form")
            form.setAttribute("action",document.location.href+"/ordonnance")
            form.setAttribute("method","POST")

            let numOrdonnance = document.createElement("input")
            creerElement(numOrdonnance,"numOrdonnance","number","input","Numéro de l'ordonnance")

            let medicament = document.createElement("input")
            creerElement(medicament,"medicament","text","input","Médicaments")

            let dosage = document.createElement("input")
            creerElement(dosage,"dosage","number","input","Dosage (en mg)")

            let quantite = document.createElement("input")
            creerElement(quantite,"quantite","number","input","Quantité (en boîtes)")

            let duree = document.createElement("input")
            creerElement(duree,"duree","number","input","Durée (en mois)")

            let renouvellement = document.createElement("input")
            creerElement(renouvellement,"renouvellement","number","input","Renouvellement")

            let valider = document.createElement("input")
            creerElement(valider,"","submit","button","")

            let elements = [numOrdonnance,medicament,dosage,duree,quantite,renouvellement,valider]

            for (let i = 0; i < elements.length; i++) {
                let div = document.createElement("div")
                div.setAttribute("class","field")
                div.append(elements[i])
                form.append(div)
            }
            
            traitement.append(form)
            document.body.append(traitement)
        } else {
            document.getElementById("traitement").remove()
        }
    })
}