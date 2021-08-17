let shoppingCarTable;
let coursesInShoppingCar = new Map();

loadEventListeners();

/**
 * Inicialization
 */
export function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    window.eventAddCourse = eventAddCourse;
    window.clearHTMLShoppingCar = clearHTMLShoppingCar;
    window.eventDeleteCourse = eventDeleteCourse;
    window.IncreaseAmountCourse = IncreaseAmountCourse;

    coursesInShoppingCar =
      JSON.parse(localStorage.getItem("shoppingCar"), reviver) || new Map([]);
    displayShoppingCarItems();
  });
}

/**
 * Event to add course
 * @param {e} event
 */
export function eventAddCourse(e) {
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
export function getCourseFromCard(courseCard, courseId) {
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
export function addCourse(course) {
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
export function addNewCourse(course) {
  const row = getHTMLRowElementCourse(course);
  getShoppingCarTable().appendChild(row);
  coursesInShoppingCar.set(course.courseId, course);
  sinchronizeStorage();
}

/**
 * Increase amount of a course
 * @param {courseId} Course ID
 */
export function IncreaseAmountCourse(courseId) {
  processAmountCourses(courseId, true);
}

/**
 * Allow delete a course
 * @param {Evento generado al eliminar un curso} e
 */
export function eventDeleteCourse(e) {
  const courseId = e.target.getAttribute("course-id");
  deleteCourse(courseId);
}
/**
 * Delete a course
 * @param {Course to delete} courseId
 */
export function deleteCourse(courseId) {
  const course = coursesInShoppingCar.get(courseId);
  shoppingCarTable = getShoppingCarTable();

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
export function decreaseAmountCourses(courseId) {
  processAmountCourses(courseId, false);
}

/**
 * Allow increasing o decreasing the amount of a course
 * @param {courseId} Course Id
 * @param {increase} increase = true - decrease = false
 */
export function processAmountCourses(courseId, increase) {
  const course = coursesInShoppingCar.get(courseId);
  shoppingCarTable = getShoppingCarTable();
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
export function getHTMLRowElementCourse(course) {
  const {title, price, amount, courseId} = course;

  const row = document.createElement("tr");
  row.id = `tableData-${courseId}`;
  row.innerHTML = `      
          <td>
              <img src='./img/curso${courseId}.jpg' width='100'>
          </td>
          <td>${title}</td>
          <td class="cell-numbers">${price}</td>
          <td class="cell-numbers" id='amount-${courseId}'>${amount}</td>
          <td class="cell-add-course">
            <button class="button-cell-courses" onclick="IncreaseAmountCourse('${courseId}')" course-id="${courseId}">+    </button>
          </td>
          <td>
            <button class="button-cell-courses" onclick="eventDeleteCourse(event)" course-id="${courseId}">-</button>
          </td>        
        `;
  return row;
}

/**
 * Sincronize data with Store
 */
export function sinchronizeStorage() {
  localStorage.setItem(
    "shoppingCar",
    JSON.stringify(coursesInShoppingCar, replacer)
  );
}

/**
 * Clean shopping car
 */
export function clearHTMLShoppingCar() {
  coursesInShoppingCar.clear();
  removeElementsInShoppingCarTable();
}

/**
 * Remove all elements
 */
export function removeElementsInShoppingCarTable() {
  shoppingCarTable = getShoppingCarTable();
  while (shoppingCarTable.firstChild) {
    shoppingCarTable.removeChild(shoppingCarTable.firstChild);
  }
}

/**
 * Display course storaged
 */
export function displayShoppingCarItems() {
  shoppingCarTable = getShoppingCarTable();
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
/**
 * Get a courses list in the shopping car
 * @returns Get a list of course in shopping car
 */
export function getCoursesInShoppingCar() {
  return coursesInShoppingCar;
}

/**
 * Get the shopping car table.
 * @returns Referente table
 */
function getShoppingCarTable() {
  if (!shoppingCarTable) {
    shoppingCarTable = document.querySelector("#shoppingCarTable tbody");
  }

  return shoppingCarTable;
}
