//Variables
const shoppingCarContainer = document.querySelector("#shoppingCarContainer");
const shoppingCarTable = document.querySelector("#shoppingCarTable tbody");
const btnEmptyShoppingCar = document.querySelector("#emptyShoppingCar");
const cardsCourses = document.querySelector("#cardsCourses");
//Cursos agregados al carrito.
let cousesInShoppingCar = [];

loadEventListeners();

function loadEventListeners() {
  // Cuando agregas un curso presionando "agregar al carrito"
  cardsCourses.addEventListener("click", addCourse);

  //Elimina cursos del carrito
  shoppingCarContainer.addEventListener("click", deleteCourse);

  //Muestra los cursos de LocalStorage
  document.addEventListener("DOMContentLoaded", () => {
    cousesInShoppingCar = JSON.parse(localStorage.getItem("shoppingCar")) || [];
    displayShoppingCarItems();
  });

  //Vacionar el carrito .
  btnEmptyShoppingCar.addEventListener("click", () => {
    console.log("Vaciando ");
    cousesInShoppingCar = [];

    clearHTMLShoppingCar(); //Eliminamos todo el HTML
  });
}

// Funciones
function addCourse(e) {
  console.log(e.target);

  if (e.target.classList.contains("add-shopping-car")) {
    const seletedCourse = e.target.parentElement.parentElement;

    processCourse(seletedCourse);
    cousesInShoppingCar;
  }
}

//Elimina un curso del carrito
function deleteCourse(e) {
  if (e.target.classList.contains("empty-course")) {
    const courseId = e.target.getAttribute("data-id");

    //Elimina del arreglo del articulosCarrito por el data-id
    cousesInShoppingCar = cousesInShoppingCar.filter(
      (curso) => curso.id !== courseId
    );

    displayShoppingCarItems(); // Iteramos de nuevo y mostramos el HTML.
  }
}

// leer el contenido de HTML al que le dimos click y extraer la info del curso
function processCourse(course) {
  // Crear un objeto con el contenido del cursos actual
  const infoCourse = {
    image: course.querySelector("img").src,
    title: course.querySelector("h4").textContent,
    price: course.querySelector(".price-style span").textContent,
    id: course.querySelector(".add-shopping-car").getAttribute("data-id"),
    amount: 1,
  };

  //Revisar si un elemento ya existe en el carrito
  /* some permite iterar sobre un arreglo de objetos y 
  verificar si un elemento existe en elemento */
  const courseExists = cousesInShoppingCar.some(
    (course) => course.id === infoCourse.id
  );
  if (courseExists) {
    //Actualizamos la cantidad. map crea un nuevo arreglo.
    const coursesList = cousesInShoppingCar.map((course) => {
      if (course.id === infoCourse.id) {
        course.amount++;
        return course; // Retorna el objeto actualizado
      } else {
        return course; // Retorna los objetos que no son duplicados.
      }
    });

    cousesInShoppingCar = [...coursesList];
  } else {
    // agregamos elementos al arreglo del carrito
    // agrega elementos al arreglo de carrito.
    cousesInShoppingCar = [...cousesInShoppingCar, infoCourse];
  }

  displayShoppingCarItems();
}

// Muestra el carrito de compras en el HTML
function displayShoppingCarItems() {
  // Limpiar el HTML
  clearHTMLShoppingCar();

  cousesInShoppingCar.forEach((course) => {
    const {image, title, price, amount, id} = course;

    const row = document.createElement("tr");
    // Se construye el HTML con base a en un template string
    row.innerHTML = `
        <td>
            <img src='${image}' width='100'>
        </td>
        <td>${title}</td>
        <td>${price}</td>
        <td>${amount}</td>
        <td>
          <a href="#" class="empty-course" data-id="${id}"> X </a>
        </td>
        `;

    // agrega el HTML en el carrito
    shoppingCarTable.appendChild(row);
  });

  //Adicionar al storage
  sinchronizeStorage();
}

function sinchronizeStorage() {
  localStorage.setItem("shoppingCar", JSON.stringify(cousesInShoppingCar));
}

// Elimina los cursos agregados al carrito del tbody
function clearHTMLShoppingCar() {
  // Dos forma de eliminar elementos
  //Forma lenta de limpiar un contenedor.
  //contenedorCarrito.innerHTML = "";

  // Mientras que haya un hijo, itera. Mas rapida que innerHTML.
  while (shoppingCarTable.firstChild) {
    shoppingCarTable.removeChild(shoppingCarTable.firstChild);
  }
}
