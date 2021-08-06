//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
//Cursos agregados al carrito.
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  // Cuando agregas un curso presionando "agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vacionar el carrito .
  vaciarCarritoBtn.addEventListener("click", () => {
    console.log("Vaciando ");
    articulosCarrito = [];

    limpiarHTML(); //Eliminamos todo el HTML
  });
}

// Funciones
function agregarCurso(e) {
  console.log(e.target);

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
    articulosCarrito;
  }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
  console.log("Elimina curso...", e.target.classList);
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    console.log(cursoId);

    //Elimina del arreglo del articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    console.log(articulosCarrito);

    carritoHTML(); // Iteramos de nuevo y mostramos el HTML.
  }
}

// leer el contenido de HTML al que le dimos click y extraer la info del curso
function leerDatosCurso(curso) {
  // Crear un objeto con el contenido del cursos actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector(".agregar-carrito").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisar si un elemento ya existe en el carrito
  /* some permite iterar sobre un arreglo de objetos y 
  verificar si un elemento existe en elemento */
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualizamos la cantidad. map crea un nuevo arreglo.
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado
      } else {
        return curso; // Retorna los objetos que no son duplicados.
      }
    });

    articulosCarrito = [...cursos];
  } else {
    // agregamos elementos al arreglo del carrito
    // agrega elementos al arreglo de carrito.
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();

  articulosCarrito.forEach((curso) => {
    console.log(curso);

    const {imagen, titulo, precio, cantidad, id} = curso;

    const row = document.createElement("tr");
    // Se construye el HTML con base a en un template string
    row.innerHTML = `
        <td>
            <img src='${imagen}' width='100'>
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
          <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

    // agrega el HTML en el carrito
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos agregados al carrito del tbody
function limpiarHTML() {
  // Dos forma de eliminar elementos
  //Forma lenta de limpiar un contenedor.
  //contenedorCarrito.innerHTML = "";

  // Mientras que haya un hijo, itera. Mas rapida que innerHTML.
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
