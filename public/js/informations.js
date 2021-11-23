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
            buttonOrdonnance.innerHTML = " - Retirer le formulaire"
            buttonOrdonnance.setAttribute("class","button is-danger")
            
            let ordonnance = document.createElement("div")
            ordonnance.setAttribute("class","container")
            ordonnance.setAttribute("id","ordonnance")

            let titre = document.createElement("h2")
            titre.innerHTML = "Ajouter une ordonnance"
            titre.setAttribute("class","title is-2")
            titre.style.textAlign = "center"
    
            let form = document.createElement("form")
            form.setAttribute("action",document.location.href+"/ajouterOrdonnance")
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
            buttonOrdonnance.innerHTML = "+ Ajouter une ordonnance"
            buttonOrdonnance.setAttribute("class","button is-info")
            document.getElementById("ordonnance").remove()
        }
    })
}