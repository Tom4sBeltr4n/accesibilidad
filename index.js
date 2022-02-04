window.onload = () => {
  document.querySelector(".arrow-right").addEventListener("click", clickRight);
  document.querySelector(".arrow-left").addEventListener("click", clickLeft);
  document
    .querySelector(".send-button")
    .addEventListener("click", showNotification);
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

/** Esta función se llama cuando la persona hace click en el boton de enviar del formulario de contacto */
function showNotification() {
  document.querySelector(".notification").style.display = "flex";
  setTimeout(function() {
    document.querySelector(".notification").style.display = "none";
  }, 3000);
}

/** Esta función se llama cuando la persona hace click en cualquier proyecto del carrusel */
function openModal(e) {
  document.querySelector(".moldal-container").style.display = "flex";
  console.log(e.target.getAttribute('src'));
  console.log(e.target.tagName);
  if(e.target.tagName.toLowerCase() == "img")
  {
    document.querySelector(".modal-project-image").setAttribute("src", e.target.getAttribute('src'))
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
  }
}
