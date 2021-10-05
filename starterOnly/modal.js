function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");

// ** ETAPE 1 **
// OUVERTURE / FERMETURE DE LA MODALE
// AJOUT D EVENEMENTS AU CLIC (launchModal() SUR LE BOUTON class="btn-signup modal-btn" / launchModalClose() SUR LE SPAN id="btn-close" )

// AU CLIC SUR LE BOUTON "Je m'inscris", LA MODALE EST EN DISPLAY BLOCK ET DONC APPARAIT // ON MODIFIE LE STYLE DE modalbg
      function launchModal() {
        modalbg.style.display = "block";
      }
// AU CLIC SUR LA CROIX (span) PRESENTE DANS LA DIV "bground", LA MODALE EST EN DISPLAY NONE ET DONC SE FERME // ON MODIFIE LE STYLE DE modalbg
      function launchModalClose() { 
        modalbg.style.display = "none"
      }

// ** ETAPE 2 + ETAPE 3 **
  // ON RECUPERE LES ELEMENTS DU DOM
  var formValidPrenom = document.getElementById('first');
  var formValidNom = document.getElementById('last');
  var formValidEmail = document.getElementById('email');
  var formValidBirthDate = document.getElementById('birthdate');
  var formValidNumberOfParticipation = document.getElementById('quantity');
  var formValidCGU = document.getElementById('checkCGU');
  var formValid = document.getElementById("form");
  
  // ECOUTEURS DES LE RELACHEMENT D UNE TOUCHE DU CLAVIER = LA FONCTION EST APPELEE   
  formValidPrenom.addEventListener('keyup', validationPrenom);
  formValidNom.addEventListener('keyup', validationName);
  formValidEmail.addEventListener('keyup', validationEmail);
  formValidBirthDate.addEventListener('click', validationBirthDate);
  formValidNumberOfParticipation.addEventListener('keyup', validationNumberOfParticipation);
  formValidCGU.addEventListener('click', validationCGU);
  formValid.addEventListener('click', validate);
  
  // CONDITION POUR LE PRENOM = SI : LA VALEUR DE first EST INFERIEUR A 2, ALORS ON AFFICHE UN MESSAGE D ERREUR. SI NON : ON EFFACE LE MESSAGE D ERREUR SI PRECEDEMmENT AFFICHE
  function validationPrenom(){
      if (first.value.length < 2){
          errorFirst.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom';
          errorFirst.style.color = 'red';
      }else{
          errorFirst.textContent = ' ';
      }
  }

   // CONDITION POUR LE NOM = SI : LA VALEUR DE last EST INFERIEUR A 2, ALORS ON AFFICHE UN MESSAGE D ERREUR. SI NON : ON EFFACE LE MESSAGE D ERREUR SI PRECEDEMMENT AFFICHE
  function validationName(){
    if (last.value.length < 2 ){
        errorLast.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom';
        errorLast.style.color = 'red';
    }else{
        errorLast.textContent = ' ';
    }
}

   // CONDITION POUR L'EMAIL = SI : LA VALEUR DE email N EST PAS VALIDE, ALORS ON AFFICHE UN MESSAGE D ERREUR. SI NON : ON EFFACE LE MESSAGE D ERREUR SI PRECEDEMMENT AFFICHE
    function validationEmail(){
      let formValidEmail = document.getElementById('email');
      let regex = /\w+@+\w+[.]+com|fr/;
      console.log(regex.test(formValidEmail.value));
    if (!regex.test(formValidEmail.value) || formValidEmail.validity.valueMissing){
        errorEmail.textContent = 'Veuillez entrer une adresse électronique valide';
        errorEmail.style.color = 'red';
    }else{
        errorEmail.textContent = "L'adresse électronique est valide"
        errorEmail.style.color = 'green';
    }
  }

   // CONDITION POUR LA DATE DE NAISSANCE = SI : AUCUNE DATE DE NAISSANCE EST MENTIONNEE, ALORS ON AFFICHE UN MESSAGE D ERREUR. SI NON : ON EFFACE LE MESSAGE D ERREUR SI PRECEDEMMENT AFFICHE
   function validationBirthDate(){
    if (birthdate.validity.valueMissing ){
        errorBirthDate.textContent = 'Veuillez saisir une date';
        errorBirthDate.style.color = 'red';
    }else{
        errorBirthDate.textContent = " "

    }
}
    // CONDITION POUR QUE L INPUT NOMBRE DE TOURNOIS PRENNE EN COMPTE LA VALEUR NUMBER ET ENVOIE UN MESSAGE D ERREUR QUAND CE N EST PAS UN NOMBRE QUI EST SAISI +
   // CONDITION POUR LE NOMBRE DE TOURNOI PARTICIPES = SI : AUCUN NOMBRE N EST ENTRE, ALORS ON AFFICHE UN MESSAGE D ERREUR. SI NON : ON EFFACE LE MESSAGE D ERREUR SI PRECEDEMMENT AFFICHE
   function validationNumberOfParticipation(){
     var valMin = 0
     var valMax = 99
     console.log(quantity.value);
        // ON VERIFIE QUE L UTILISATEUR SAISI UN NOMBRE, SI CE N EST PAS LE CAS ON AFFICHE UN MESSAGE D ERREUR
    if (quantity.value == Number.isNaN()){
        errorNumberOfParticipation.textContent = 'Veuillez saisir un nombre';
        errorNumberOfParticipation.style.color = 'red';
        // ON VERIFIE QUE L UTILISATEUR SAISI UNE VALEUR COMPRISE ENTRE 0 ET 99, SI NON ON AFFICHE UN MESSAGE D ERREUR
    }else if(quantity.validity.valueMissing || quantity.value < valMin || quantity.value > valMax ){
        errorNumberOfParticipation.textContent = 'Veuillez saisir un nombre compris entre 0 et 99';
        errorNumberOfParticipation.style.color = 'red';
        // SI LES 2 CONDITIONS PRECEDENTES SONT REMPLIES, ON EFFACE LES MESSAGES D ERREUR SI BESOIN
    }else{
        errorNumberOfParticipation.textContent = " "
   }
  }

  // ********************************************************************
  
    // REMARQUE : POURQUOI DEMANDER A L UTILISATEUR DE SELECTIONNER UNE VILLE VU QU UNE CASE EST COCHEE PAR DEFAUT (ETAPE 2-5) ?? IMPOSSIBLE DE METTRE UN MESSAGE D ERREUR VU QUE L UTILISATEUR VEUT PEUT ETRE SELECTIONNEE LA VILLE COCHEE PAR DEFAUT ! 

  // ********************************************************************

    // CONDITION POUR COCHER UNE VILLE = SI : AUCUNE VILLE N EST SELECTIONEE, ALORS ON AFFICHE UN MESSAGE D ERREUR. SI NON : ON EFFACE LE MESSAGE D ERREUR SI PRECEDEMMENT AFFICHE
    //       // function test(){
          var formValidCity = document.querySelectorAll('input[name="location"]');
          // console.log(formValidCity);
          
          function participationTournoiCity(){
                 for (var i = 0; i < formValidCity.length; i++) {
                  if (formValidCity[0].checked){ 
                    errorCity.textContent = "Vous avez choisi la proposition " + formValidCity[0].value
                    errorCity.style.color = 'green';
                  }else if (formValidCity[1].checked){
                    errorCity.textContent = "Vous avez choisi la proposition " + formValidCity[1].value
                    errorCity.style.color = 'green';
                  }else if (formValidCity[2].checked){
                    errorCity.textContent = "Vous avez choisi la proposition " + formValidCity[2].value
                    errorCity.style.color = 'green';
                  }else if (formValidCity[3].checked){
                    errorCity.textContent = "Vous avez choisi la proposition " + formValidCity[3].value
                    errorCity.style.color = 'green';
                  }else if (formValidCity[4].checked){
                    errorCity.textContent = "Vous avez choisi la proposition " + formValidCity[4].value
                    errorCity.style.color = 'green';
                  }else if (formValidCity[5].checked){
                    errorCity.textContent = "Vous avez choisi la proposition " + formValidCity[5].value
                    errorCity.style.color = 'green';
                  }else{
                    console.log("Vous devez choisir une option")
                  }
                }
      }

  // ********************************************************************

   // REMARQUE : IMPORTANCE DE METTRE LES FONCTIONS onclick SUR LES INPUTS ET NON LES SPAN!!!!! SANS CA IL NE LIE PAS LES INPUTS AUX BON NOMS DE VILLES !

  // ********************************************************************

   // CONDITION POUR COCHER LES CGU = SI : LA CASE CGU N EST PAS COCHEE, ALORS ON AFFICHE UN MESSAGE D ERREUR. SI NON : ON EFFACE LE MESSAGE D ERREUR SI PRECEDEMMENT AFFICHE
  //  PETIT CONTOURNEMENT ! A AMELIORER ?
   function validationCGU() {
    if(formValidCGU.checked == true){
      errorCGU.textContent = " "
    }else{
      errorCGU.textContent = " Vous devez accepter nos CGU "
      errorCGU.style.color = 'red';
    }
  }

  // ** ETAPE 4 **
  // CREATION DE L EVENEMENT AU CLIC SUR L INPUT class="button". IL PERMET D AFFICHER UN MESSAGE DE CONFIRMATION A L UTILISATEUR UNE FOIS QU IL A VALIDE SON FORMULAIRE D INSCRIPTION

  function validate(){
    console.log("formValidPrenom.value");
    if(formValidPrenom.validity.valueMissing ||
       formValidNom.validity.valueMissing ||
       formValidEmail.validity.valueMissing ||
       formValidBirthDate.validity.valueMissing ||
       formValidNumberOfParticipation.validity.valueMissing ||
       formValidCGU.validity.valueMissing){
        errorConfirmation.textContent = "Merci de compléter toutes les entrées du formulaire"
        errorConfirmation.style.color = "red"
        return false
    }else{
        errorConfirmation.textContent = " "
        alert("Merci ! Votre réservation a bien été enregistrée.");
        return true
    }
  }
  

// *********************************************************************************************************************************

// CONSIGNES
// #5 Tests manuels
  // Visualiser et tester l'interface utilisateur dans les dernières versions de Chrome et de Firefox, ainsi que dans les versions mobile et desktop. Corriger les erreurs d'affichage existantes.
  // Tester toutes les fonctionnalités des boutons et des entrées de formulaire (tester les valeurs correctes et incorrectes)

// #4 Ajouter confirmation quand envoie réussi
// Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.")

// #3 Ajouter validation ou messages d'erreur
// Des messages d'erreur spécifiques doivent apparaître sous l'entrée qui n'est pas correcte. Les messages d'erreur doivent s'afficher sous le champ de saisie associé. Exemples :

  // "Veuillez entrer 2 caractères ou plus pour le champ du nom."
  // "Vous devez choisir une option."
  // "Vous devez vérifier que vous acceptez les termes et conditions."
  // "Vous devez entrer votre date de naissance."

// #2 Implémenter entrées du formulaire
// (1) Lier les labels aux entrées dans le HTML en utilisant les attributs "for" et "id" dans le code existant. Corriger le code HTML quand nécessaire.
// --------------------> FAIT DANS LE HTML
// (2) Utiliser du JavaScript pur (pas de jQuery) pour terminer le formulaire :
  // Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
  // Les données doivent être saisies correctement :
    // (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
    // (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
    // (3) L'adresse électronique est valide.
    // (4) Pour le nombre de concours, une valeur numérique est saisie.
    // (5) Un bouton radio est sélectionné.
    // (6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
  // Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.

  // #1 rendre le (x) actif en fermant la modale

  // *********************************************************************************************************************************

