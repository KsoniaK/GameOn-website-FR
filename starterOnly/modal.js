function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const modalbg = document.querySelector(".bground");
const formInputs = document.querySelectorAll("input");
const submits = document.querySelectorAll('.btn-submit');
const locationAlls = document.querySelectorAll('[name="location"]');
const formData = document.querySelectorAll(".formData");

// EVENEMENTS AU CLIC
submits.forEach(input => {
  input.addEventListener('click', checkInput);
});

formInputs.forEach(input => {
  input.addEventListener('keyup', checkInput);
});

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
launchModal();


// ETAPE 1 RECUPERER DANS LE DOM
// CREER LES ATTRIBUTS SUR FORMDATA

function checkInput(e) {
  e.preventDefault();
formInputs.forEach(input => {

   let inputName = input.name;
   let inputValue = input.value;

   
   switch(inputName){
     case 'first':
       if (inputValue.length < 2){
       setErrorMessage(input, "Merci d'entrer au moins 2 caractères pour le prénom");
      } else {
       setSucessMessage(input);
      }
      break
      case 'last':
        if (inputValue.length < 2){
          setErrorMessage(input, "Merci d'entrer au moins 2 caractères pour le nom");
         } else {
           setSucessMessage(input);
         }
        break
        case 'email':
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
              if (!inputValue == Number.isNaN() && (inputValue <= 99 && inputValue >= 0)  ) {
                setSucessMessage(input);
                
              } else {
                setErrorMessage(input, "Merci d'entrer un nombre valide");
              }
              break
              case 'location':
                let radioCocher = 0;
                locationAlls.forEach(radio => {
                  if(radio.checked){
                    radioCocher++;
                  }
                  if (radioCocher > 0) {
                    setSucessMessage(input);
                  } else {
                    setErrorMessage(input, "Vous devez selectionner au moins une ville");
                  }
             
                });
                break
                case 'checkbox1':
                  if (input.checked) {
                    setSucessMessage(input);
                  } else {
                    setErrorMessage(input, "Vous devez accepter nos CGU avant de valider le formulaire");
                  }
                  break
   }
  });

  let sucessNumber = 0;

  formData.forEach(div => {


    if(div.classList.contains("sucess")){
      sucessNumber++
    }

    if(formData.length === sucessNumber ){
      if(e.type === 'click'){
        modalSucess();
      }
    }
  });
}
function setErrorMessage(input, message) {
  input.parentElement.setAttribute("data-error", message);
  input.parentElement.setAttribute("data-error-visible", "true");
  input.parentElement.classList.remove("sucess");
}

function setSucessMessage(input) {
  input.parentElement.classList.add("sucess");
  input.parentElement.removeAttribute("data-error");
  input.parentElement.removeAttribute("data-error-visible");
}
function modalSucess() {
  alert("Merci ! Votre participation")
}
