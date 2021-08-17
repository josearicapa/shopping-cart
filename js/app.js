const shoppingCarContainer = document.querySelector("#shoppingCarContainer");
const shoppingCarTable = document.querySelector("#shoppingCarTable tbody");
const cardsCourses = document.querySelector("#cardsCourses");

let coursesInShoppingCar = new Map();

loadEventListeners();

/**
 * Inicialization
 */
function loadEventListeners() {
  //Muestra los cursos de LocalStorage
  document.addEventListener("DOMContentLoaded", () => {
    coursesInShoppingCar =
      JSON.parse(localStorage.getItem("shoppingCar"), reviver) || new Map([]);
    displayShoppingCarItems();
  });
}

/**
 * Event to add course
 * @param {e} event
 */
function eventAddCourse(e) {
  const courseCard = e.target.parentElement.parentElement;
  const courseId = e.target.getAttribute("course-id");
  const infoCourse = getCourseFromCard(courseCard, courseId);

  addCourse(infoCourse);
}

/**
 * Get info course from a card HTML
 * @param {courseCard} course HTML Card
 * @returns course object
 */
function getCourseFromCard(courseCard, courseId) {
  return {
    title: courseCard.querySelector(".info-card h4").textContent,
    price: courseCard.querySelector(".price-style span").textContent,
    courseId: courseId,
    amount: 1,
  };
}

/**
 * Allow add or increase amount a course
 * @param {course} course to add
 */
function addCourse(course) {
  if (coursesInShoppingCar.has(course.courseId)) {
    IncreaseAmountCourse(course.courseId);
  } else {
    addNewCourse(course);
  }
}

/**
 * Allow adding a course
 * @param {course} Course to add
 */
function addNewCourse(course) {
  const row = getHTMLRowElementCourse(course);
  shoppingCarTable.appendChild(row);
  coursesInShoppingCar.set(course.courseId, course);
  sinchronizeStorage();
}

/**
 * Increase amount of a course
 * @param {courseId} Course ID
 */
function IncreaseAmountCourse(courseId) {
  processAmountCourses(courseId, true);
}

/**
 * Allow delete a course
 * @param {Evento generado al eliminar un curso} e
 */
function eventDeleteCourse(e) {
  const courseId = e.target.getAttribute("course-id");
  deleteCourse(courseId);
}
/**
 * Delete a course
 * @param {Course to delete} courseId
 */
function deleteCourse(courseId) {
  const course = coursesInShoppingCar.get(courseId);
  if (course.amount <= 1) {
    shoppingCarTable.querySelector(`#tableData-${courseId}`).remove();
    coursesInShoppingCar.delete(courseId);
  } else {
    decreaseAmountCourses(courseId);
  }
  sinchronizeStorage();
}

/**
 * Decrease amount of course
 * @param {Course Id} courseId
 */
function decreaseAmountCourses(courseId) {
  processAmountCourses(courseId, false);
}

/**
 * Allow increasing o decreasing the amount of a course
 * @param {courseId} Course Id
 * @param {increase} increase = true - decrease = false
 */
function processAmountCourses(courseId, increase) {
  const course = coursesInShoppingCar.get(courseId);
  increase ? course.amount++ : course.amount--;
  shoppingCarTable.querySelector(
    `#amount-${course.courseId}`
  ).textContent = `${course.amount}`;
}

/**
 * Get the HTML row element course
 * @param {*} course Course to be convert
 * @returns HTML row element
 */
function getHTMLRowElementCourse(course) {
  const {title, price, amount, courseId} = course;

  const row = document.createElement("tr");
  row.id = `tableData-${courseId}`;
  row.innerHTML = `      
          <td>
              <img src='./img/curso${courseId}.jpg' width='100'>
          </td>
          <td>${title}</td>
          <td>${price}</td>
          <td id='amount-${courseId}'>${amount}</td>
          <td class="cell-add-course">
            <a href="#" class="button-cell-courses" onclick="IncreaseAmountCourse('${courseId}')" course-id="${courseId}"> + </a>
          </td>
          <td>
            <a href="#" class="button-cell-courses" onclick="eventDeleteCourse(event)" course-id="${courseId}"> - </a>
          </td>        
        `;
  return row;
}

/**
 * Sincronize data with Store
 */
function sinchronizeStorage() {
  localStorage.setItem(
    "shoppingCar",
    JSON.stringify(coursesInShoppingCar, replacer)
  );
}

/**
 * Clean shopping car
 */
function clearHTMLShoppingCar() {
  coursesInShoppingCar.clear();
  removeElementsInShoppingCarTable();
}

/**
 * Remove all elements
 */
function removeElementsInShoppingCarTable() {
  // Mientras que haya un hijo, itera. Mas rapida que innerHTML.
  while (shoppingCarTable.firstChild) {
    shoppingCarTable.removeChild(shoppingCarTable.firstChild);
  }
}

/**
 * Display course storaged
 */
function displayShoppingCarItems() {
  coursesInShoppingCar.forEach((course) => {
    const row = getHTMLRowElementCourse(course);
    shoppingCarTable.appendChild(row);
  });
}

/**
 * Allow replace map values to Storage
 * @param {*} key
 * @param {*} value
 * @returns
 */
function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

/**
 * Allow retrive data
 * @param {*} key
 * @param {*} value
 * @returns
 */
function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}
