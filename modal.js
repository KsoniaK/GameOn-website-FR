function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    // TEST : UNE AUTRE MANIER D AJOUTER LA CLASS "responsive"
    x.classList.add("responsive");
    // FACON DU PREDECESSEUR
    // x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// *******************************
// ON RECUPERE LES ELEMENTS DU DOM
// *******************************
// const test = document.getElementById("confirmation");
const secondModalClose = document.getElementById("btn-close-bis");
const sucessMessageModal = document.getElementById("sucessMessage");
const valider = document.querySelector(".modal-confirm");
const validerClose = document.querySelector(".modal-confirm-close");
const modalbg = document.querySelector(".bground");
const submits = document.querySelector('.btn-submit');
const modalClose = document.querySelectorAll(".close");
const formInputs = document.querySelectorAll("input");
const locationAlls = document.querySelectorAll('[name="location"]');
const formData = document.querySelectorAll(".formData");
const modalOpen = document.querySelectorAll(".btn-signup");

// ******************
// EVENEMENTS AU CLIC
// ******************
// POUR L INPUT PORTANT LA CLASS .btn-submit ON AJOUTE UN EVENEMENT AU CLIC.
submits.addEventListener('click', checkInput);
// submits.addEventListener('click', modalSucess);

// UTILISATION DU FOREACH CAR ON A PLUSIEURS INPUTS (TABLEAU).
// POUR CHAQUE INPUT ON AJOUTE UN EVENEMENT keyup ET ON INDIQUE DANS LA FONCTION checkInput() le comportement qu'ils adopteront.
formInputs.forEach(input =>{
  input.addEventListener('keyup', checkInput)
});
// ICI UN EVENEMENT AU CLIC POUR TOUS LES BOUTONS PORTANT LA class .btn-signup
modalOpen.forEach(button =>{
  button.addEventListener('click', setModalOpen)
});
// ICI UN EVENEMENT AU CLIC POUR modalClose QUI A LA class .close
modalClose.forEach(button =>{
  button.addEventListener('click', setModalClose)
});
// modalClose.addEventListener('click', setModalClose);

valider.addEventListener('click', modalSucess);
validerClose.addEventListener('click', modalSucessConfirm);

secondModalClose.addEventListener("click", modalSucessConfirm);

// *******************************************************************
// CREATION DE LA FONCTION checkInput COMPORTANT TOUTES LES CONDITIONS
// *******************************************************************
function checkInput(e) {
  // ARRET DU COMPORTEMENT PAR DEFAUT : RECHARGEMENT DE LA PAGE A LA SOUMISSION DU FORMULAIRE
  e.preventDefault();
  // POUR CHAQUE INPUT ON VA VERIFIER CHACUNE DES CONDITIONS
formInputs.forEach(input => {

  // **********************
  // CREATION DES VARIABLES
  // **********************
  // ON RECUPERE L ATTRIBUT name DE CHAQUE INPUT
   let inputName = input.name;
  //  ON RECUPERE L ATTRIBUT value DE CHAQUE INPUT
   let inputValue = input.value;
  //  CREATION DE LA constante REGEX
  // EXEMPLE REGEX ONLINE :  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
   const emailRegex = /\w+@+\w+[.]+\w/;

  //  ON VERIFIE LES CONDITIONS GRACE A L ATTRIBUT name DE CHAQUE INPUT
   switch(inputName){
    //  PREMIER CAS: SI L INPUT AYANT UN ATTRIBUT name EST EGAL A 'first' , ALORS ON ENTRE DANS LA CONDITION
     case 'first':
      //  SI L ATTRIBUT value de L'INPUT AYANT L'ATTRIBUT name égal à 'first' EST INFERIEUR A 2 : 
      // APPEL DE LA FONCTION setErrorMessage() A L ENDROIT OU SE TROUVE L INPUT CONCERNE AVEC LE MESSAGE D ERREUR APPROPRIE
       if (inputValue.length < 2){
       setErrorMessage(input, "Merci d'entrer au moins 2 caractères pour le prénom");
      } else {
        // SI LA CONDITION N EST PAS REMPLIE : APPEL DE LA FONCTION setSucessMessage() A L ENDROIT OU SE TROUVE L INPUT CONCERNE.
       setSucessMessage(input);
      }
      // SI ON ENTRE DANS L UNE DES CONDITIONS, ON SORT DU SWITCH POUR ALLER DIRECTEMENT DANS LA FONCTION setErrorMessage ou setSucessMessage.
      // PUIS, VU QU ON EST DANS UN ForEach, ON RECOMMENCE AVEC L INPUT SUIVANT JUSQU AU DERNIER
      break
      case 'last':
        if (inputValue.length < 2){
          setErrorMessage(input, "Merci d'entrer au moins 2 caractères pour le nom");
         } else {
           setSucessMessage(input);
         }
        break
        case 'email':
          // SI: L ATTRIBUT value DE L INPUT DONT L ATTRIBUT name EST EGAL A 'email' EST DIFFERENT DE LA const Regex
          if(inputValue.match(emailRegex)){
            setSucessMessage(input);
          }else{
            setErrorMessage(input, "Merci d'entrer un email valide");
          }
          break
          case 'birthdate':
            if (!inputValue) {
              setErrorMessage(input, "Merci d'entrer une date valide");
            } else {
              setSucessMessage(input);
            }
            break
            case 'quantity':
              // SI: L ATTRIBUT value DE L INPUT DONT L ATTRIBUT name EST EGAL A 'quantity' EST UN NOMBRE ET QU IL EST EGAL OU INFERIEUR A 99 OU EGAL OU SUPERIEUR A 0
              if (!inputValue == Number.isNaN() && (inputValue <= 99 && inputValue >= 0)  ) {
                setSucessMessage(input);
              } else {
                setErrorMessage(input, "Merci d'entrer un nombre valide");
              }
              break
              case 'location':
                // CREATION DE LA VARIABLE ICI POUR EVITER QU ELLE NE SOIT CREER A CHAQUE VERIFICATION D INPUT POUR LE SWITCH
                let radioCocher = 0;
                // ON VERIFIE SI UN INPUT TYPE radio EST COCHE (locationAlls = VARIABLE STOCKANT TOUS LES INPUTS TYPE radio)
                locationAlls.forEach(radio => {
                  // SI INPUT TYPE radio EST SELECTIONNE, ON INCREMENTE
                  if(radio.checked){
                    radioCocher++;
                  }
                  // SI AU MOINS 1 INPUT TYPE radio N EST SELECTIONNE
                  if (radioCocher > 0) {
                    // setSucessMessage est lancée
                    setSucessMessage(input);
                  } else {
                    setErrorMessage(input, "Vous devez selectionner au moins une ville");
                  }
             
                });
                break
                case 'checkbox1':
                  // SI L INPUT AYANT L ATTRIBUT name EGAL A 'checkbox1' EST SELECTIONNE
                  if (input.checked) {
                    setSucessMessage(input);
                  } else {
                    setErrorMessage(input, "Vous devez accepter nos CGU");
                  }
                  break
   }
  });
  let sucessNumber = 0;
  // ON VERIFIE QUE TOUTES LES DIV AYANT POUR class .formData CONTIENNENT BIEN LA class .sucess POUR ENVOYER LE FORMULAIRE
  formData.forEach(div => {
    if(div.classList.contains("sucess")){
      // SI OK, ON INCREMENTE sucessNumber
      sucessNumber++
    }
      // SI LA LONGUEUR DU TABLEAU QUE FORME formData (PLUSIEURS DIV ONT LA class .formData, donc il est assimilé à un tableau) EST EGALE A CELUI QUE FORME sucessNumber ET QU ON CLICK SUR LE BOUTON DE SOUMISION DU FORMULAIRE
      // ALORS: ON LANCE modalSucess(), launchModalClose() ET ON REMET LE FORMULAIRE A 0
      if(formData.length === sucessNumber && e.type === 'click'){
          modalSucess();
          setModalClose();
          document.forms[0].reset()
      }
  });
} 
// ***************
// LES FONCTIONS
// ***************
// FONCTION POUR OUVRIR LA MODALE
function setModalOpen(){
  modalbg.style.display = "block"
}
// FONCTION POUR FERMER LA MODALE
function setModalClose(){
  modalbg.style.display = "none";
}
// FONCTION POUR LES MESSAGES D ERREUR
// ELLE PREND 2 PARAMETRES
function setErrorMessage(input, message) {
  // SUR L ELEMENT PARENT: ON AJOUTE L ATTRIBUT data-error + message
  input.parentElement.setAttribute("data-error", message);
  // SUR L ELEMENT PARENT: ON AJOUTE L ATTRIBUT data-error-visible QUI EST EGAL A "true"
  input.parentElement.setAttribute("data-error-visible", "true");
  // SUR L ELEMENT PARENT: ON SUPPRIME LA class .sucess
  input.parentElement.classList.remove("sucess");
}
// FONCTION LORSQUE LA SAISIE EST CORRECTE
// ELLE PREND 1 PARAMETRE
function setSucessMessage(input) {
  // SUR L ELEMENT PARENT: ON AJOUTE LA class .sucess
  input.parentElement.classList.add("sucess");
  // SUR L ELEMENT PARENT: ON SUPPRIME LES ATTRIBUTS data-error et data-error-visible
  input.parentElement.removeAttribute("data-error");
  input.parentElement.removeAttribute("data-error-visible");
}
// FONCTION QUI AFFICHE UNE ALERTE LORSQUE LE FORMULAIRE A ETE CORRECTEMENT REMPLI
// ON OUVRE LA MODALE DE CONFIRMATION
function modalSucess(){
  valider.style.display = "flex";
}
// ON LA FERME
function modalSucessConfirm(){
  valider.style.opacity = 0;
  location.reload();
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

  //  *********************************************************************************************************************************
