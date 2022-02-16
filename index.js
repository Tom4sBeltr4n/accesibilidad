let projectChoice = 0;

window.onload = () => {
  document.querySelector(".arrow-right").addEventListener("click", clickRight);
  document.querySelector(".arrow-left").addEventListener("click", clickLeft);
  document
    .querySelector(".send-button")
    .addEventListener("click", e => validateForm(e));
  document.querySelectorAll(".project").forEach(element => {
    element.addEventListener("click", e => openModal(e));
  });
};

/** Esta función se llama cuando la persona hace click en la flecha derecha del carrusel para navegar a la derecha */
function clickRight() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft < -270) { //si el valor de izquierda es menor a -270, para de mover el contenido
    return;
  }
  let newValue = currentLeft - 270; //270 toma en cuenta el tamaño de la imagen más sus márgenes
  document.querySelector(".project-container").style.left = `${newValue}px`;
  switch(newValue)
  {
    case -270:
      document.querySelector(".project1").setAttribute("tabindex", "-1");
      document.querySelector(".project1-container").setAttribute("aria-hidden", true);
      document.querySelector(".project4-container").removeAttribute("aria-hidden");
      document.querySelector(".project4").removeAttribute("tabindex");
      break;
    case -540:
      document.querySelector(".project2").setAttribute("tabindex", "-1");
      document.querySelector(".project2-container").setAttribute("aria-hidden", true);
      document.querySelector(".project5-container").removeAttribute("aria-hidden");
      document.querySelector(".project5").removeAttribute("tabindex");
      break;
    default:
      break;
  }
}

/** Esta función se llama cuando la persona hace click en la flecha izquierda del carrusel para navegar a la izquierda */
function clickLeft() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft === 0) { //si el valor de izquiera es 0, retornar para no seguir moviendo el contenido
    return;
  }
  let newValue = currentLeft + 270;
  document.querySelector(".project-container").style.left = `${newValue}px`;
  switch(newValue)
  {
    case -270:
      document.querySelector(".project5").setAttribute("tabindex", "-1");
      document.querySelector(".project5-container").setAttribute("aria-hidden", true);
      document.querySelector(".project2-container").removeAttribute("aria-hidden");
      document.querySelector(".project2").removeAttribute("tabindex");
      break;
    case 0:
      document.querySelector(".project4").setAttribute("tabindex", "-1");
      document.querySelector(".project4-container").setAttribute("aria-hidden", true);
      document.querySelector(".project1-container").removeAttribute("aria-hidden");
      document.querySelector(".project1").removeAttribute("tabindex");
      break;
    default:
      break;
  }
}

// Esta función validará el formulario antes de mostrar la notificación
function validateForm(e)
{
  e.preventDefault();
  const nameField = document.getElementById("name");
  const emailField = document.getElementById("mail");
  const messageField = document.getElementById("message");
  const nameFieldArray = Array.from(nameField.value);
  const emailFieldArray = Array.from(emailField.value);
  if(nameField.value === "")
  {
    document.getElementById("name-error").textContent = "ADVERTENCIA: Para enviar el formulario es necesario introducirle un nombre.";
    setTimeout(()=>{document.getElementById("name-error").textContent = "";return undefined},4000)
  } else if(nameFieldArray.some((item)=>{return !isNaN(parseInt(item))})) {
    document.getElementById("name-error").textContent = "Por favor no introduzcas números en tu nombre";
    setTimeout(()=>{document.getElementById("name-error").textContent = "";return undefined},4000)
  }else if(!emailField.value || !emailFieldArray.includes("@",1) || !emailFieldArray.slice(emailFieldArray.indexOf("@")).includes(".",2) || emailFieldArray.slice(emailFieldArray.indexOf("@")).length < 5){
    document.getElementById("email-error").textContent = "Introduce, por favor, una dirección de correo electrónico apropiada";
    setTimeout(()=>{document.getElementById("email-error").textContent = "";return undefined},4000)
  } else if(!messageField) {
    document.getElementById("message-error").textContent = "¡No olvides el mensaje!";
    setTimeout(()=>{document.getElementById("message-error").textContent = "";return undefined},4000)
  } else {
    showNotification();
  }
}

/** Esta función se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() 
{
  document.getElementById("name-error").innerHTML = "";
  document.querySelector('.form-container').reset();
  document.querySelector(".notification").style.display = "flex";
  setTimeout(function() {
    document.querySelector(".notification").style.display = "none";
  }, 3000);
}

/** Esta función se llama cuando la persona hace click en cualquier proyecto del carrusel */
function openModal(e) {
  document.querySelector(".moldal-container").style.display = "flex";
  document.getElementById("modal-header").focus();
  if(e.target.tagName.toLowerCase() == "img")
  {
    document.querySelector(".modal-project-image").setAttribute("src", e.target.getAttribute('src'));
    projectChoice = e.target.parentElement;
  } else if(e.target.tagName.toLowerCase() == "button")
  {
    projectChoice = e.target;
    document.querySelector(".modal-project-image").setAttribute("src", e.target.children.item(0).getAttribute('src'));
  };
  document.body.addEventListener("click", e => closeModal(e), "once");
  document.addEventListener("keydown", keyboardEvent)
  function keyboardEvent(event)
  {
    if(event.keyCode == 27)
    {
      closeModal(event);
    };
  };
};

/** Esta función se llama para cerrar el modal */
function closeModal(e) {
  // si el click occurió dentro del modal, no se cierra el modal. Alternativamente, sí
  if ((e.target.className.includes("modal") || e.target.className.includes("header")) && (e.type == "click")) 
  {
    return;
  } else {
    document.querySelector(".moldal-container").style.display = "none";
    document.body.removeEventListener("click", e => closeModal(e));
    projectChoice.focus();
  }
}
