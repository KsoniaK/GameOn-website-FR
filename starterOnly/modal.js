function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
// *******************************
// ON RECUPERE LES ELEMENTS DU DOM
// *******************************
const modalbg = document.querySelector(".bground");
const formInputs = document.querySelectorAll("input");
const submits = document.querySelector('.btn-submit');
const locationAlls = document.querySelectorAll('[name="location"]');
const formData = document.querySelectorAll(".formData");
const sucessMessageModal = document.getElementById("sucessMessage");

// ******************
// EVENEMENTS AU CLIC
// ******************
// POUR L INPUT PORTANT LA CLASS .btn-submit ON AJOUTE UN EVENEMENT AU CLIC.
submits.addEventListener('click', checkInput);
// UTILISATION DU FOREACH CAR ON A PLUSIEURS INPUTS (TABLEAU).
// POUR CHAQUE INPUT ON AJOUTE UN EVENEMENT keyup ET ON INDIQUE DANS LA FONCTION checkInput() le comportement qu'ils adopteront.
formInputs.forEach(input => {
  input.addEventListener('keyup', checkInput);
});

// **********************************
// OUVERTURE / FERMETURE DE LA MODALE
// **********************************
// AJOUT D EVENEMENTS AU CLIC (launchModal() SUR LE BOUTON class="btn-signup modal-btn" / launchModalClose() SUR LE SPAN id="btn-close" )
// AU CLIC SUR LE BOUTON "Je m'inscris", LA MODALE EST EN DISPLAY BLOCK ET DONC APPARAIT // ON MODIFIE LE STYLE DE modalbg
      function launchModal() {
        modalbg.style.display = "block";
      }
// AU CLIC SUR LA CROIX (span) PRESENTE DANS LA DIV "bground", LA MODALE EST EN DISPLAY NONE ET DONC SE FERME // ON MODIFIE LE STYLE DE modalbg
      function launchModalClose() { 
        modalbg.style.display = "none"
      }

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
   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
          if(!inputValue.match(emailRegex)){
            setErrorMessage(input, "Merci d'entrer un email valide");
          }else{
            setSucessMessage(input);
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
    if(formData.length === sucessNumber ){
      if(e.type === 'click'){
        modalSucess();
        launchModalClose();
        // document.forms[0].reset()
      }
    }
  });
}

// ***************
// LES FONCTIONS
// ***************
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
function modalSucess() {
  alert("Merci ! Votre participation a bien été enregistrée")
  // sucessMessageModal.style.opacity = 1;
}


