//Variables
const shoppingCarContainer = document.querySelector("#shoppingCarContainer");
const shoppingCarTable = document.querySelector("#shoppingCarTable tbody");
const cardsCourses = document.querySelector("#cardsCourses");
//Cursos agregados al carrito.
let cousesInShoppingCar = [];

loadEventListeners();

function loadEventListeners() {
  //Muestra los cursos de LocalStorage
  document.addEventListener("DOMContentLoaded", () => {
    cousesInShoppingCar = JSON.parse(localStorage.getItem("shoppingCar")) || [];
    displayShoppingCarItems();
  });
}

// Funciones
function addCourse(e) {
  const seletedCourse = e.target.parentElement.parentElement;
  processCourse(seletedCourse);
}

/**
 * Allow delete a course
 * @param {Evento generado al eliminar un curso} e
 */
function deleteCourse(e) {
  const parentElement = e.target.parentElement.parentElement;
  parentElement.remove();
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
  removeElementsInShoppingCarTable();

  cousesInShoppingCar.forEach((course) => {
    const {image, title, price, amount, id} = course;

    const row = document.createElement("tr");
    row.id = `row-${id}`;

    // Se construye el HTML con base a en un template string
    row.innerHTML = `      
          <td>
              <img src='${image}' width='100'>
          </td>
          <td>${title}</td>
          <td>${price}</td>
          <td>${amount}</td>
          <td class="cell-add-course">
            <a href="#" class="button-cell-courses" onclick="deleteCourse(event)" data-id="${id}"> + </a>
          </td>
          <td>
            <a href="#" class="button-cell-courses" onclick="deleteCourse(event)" data-id="${id}"> - </a>
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
  cousesInShoppingCar = [];
  removeElementsInShoppingCarTable();
}

function removeElementsInShoppingCarTable() {
  // Mientras que haya un hijo, itera. Mas rapida que innerHTML.
  while (shoppingCarTable.firstChild) {
    shoppingCarTable.removeChild(shoppingCarTable.firstChild);
  }
}
