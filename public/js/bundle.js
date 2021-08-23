/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadEventListeners\": () => (/* binding */ loadEventListeners),\n/* harmony export */   \"eventAddCourse\": () => (/* binding */ eventAddCourse),\n/* harmony export */   \"getCourseFromCard\": () => (/* binding */ getCourseFromCard),\n/* harmony export */   \"addCourse\": () => (/* binding */ addCourse),\n/* harmony export */   \"addNewCourse\": () => (/* binding */ addNewCourse),\n/* harmony export */   \"IncreaseAmountCourse\": () => (/* binding */ IncreaseAmountCourse),\n/* harmony export */   \"deleteCourse\": () => (/* binding */ deleteCourse),\n/* harmony export */   \"decreaseAmountCourses\": () => (/* binding */ decreaseAmountCourses),\n/* harmony export */   \"processAmountCourses\": () => (/* binding */ processAmountCourses),\n/* harmony export */   \"getHTMLRowElementCourse\": () => (/* binding */ getHTMLRowElementCourse),\n/* harmony export */   \"sinchronizeStorage\": () => (/* binding */ sinchronizeStorage),\n/* harmony export */   \"clearHTMLShoppingCar\": () => (/* binding */ clearHTMLShoppingCar),\n/* harmony export */   \"removeElementsInShoppingCarTable\": () => (/* binding */ removeElementsInShoppingCarTable),\n/* harmony export */   \"displayShoppingCarItems\": () => (/* binding */ displayShoppingCarItems),\n/* harmony export */   \"getCoursesInShoppingCar\": () => (/* binding */ getCoursesInShoppingCar)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar shoppingCarTable;\nvar coursesInShoppingCar = new Map();\nloadEventListeners();\n/**\n * Inicialization\n */\n\nfunction loadEventListeners() {\n  document.addEventListener(\"DOMContentLoaded\", function () {\n    coursesInShoppingCar = JSON.parse(localStorage.getItem(\"shoppingCar\"), reviver) || new Map([]);\n    displayShoppingCarItems();\n    addButtonsListeners();\n    addClearShoppingCarListener();\n  });\n}\n/**\n * Add buttons add courses listener,\n */\n\nfunction addButtonsListeners() {\n  var buttons = document.getElementsByClassName(\"add-shopping-car\");\n\n  var _loop = function _loop(i) {\n    var btnAddCourse = buttons[i];\n    btnAddCourse.addEventListener(\"click\", function () {\n      eventAddCourse(btnAddCourse);\n    });\n  };\n\n  for (var i = 0; i < buttons.length; i++) {\n    _loop(i);\n  }\n}\n/**\n * Clear shopping car\n */\n\n\nfunction addClearShoppingCarListener() {\n  var btnEmptyShoppingCar = document.getElementById(\"emptyShoppingCar\");\n  btnEmptyShoppingCar.addEventListener(\"click\", function () {\n    clearHTMLShoppingCar();\n  });\n}\n/**\n * Event to add course\n * @param {e} event\n */\n\n\nfunction eventAddCourse(btnAddCourse) {\n  var courseCard = btnAddCourse.parentElement.parentElement;\n  var courseId = btnAddCourse.getAttribute(\"course-id\");\n  var infoCourse = getCourseFromCard(courseCard, courseId);\n  addCourse(infoCourse);\n}\n/**\n * Get info course from a card HTML\n * @param {courseCard} course HTML Card\n * @returns course object\n */\n\nfunction getCourseFromCard(courseCard, courseId) {\n  return {\n    title: courseCard.querySelector(\".info-card h4\").textContent,\n    price: courseCard.querySelector(\".price-style span\").textContent,\n    courseId: courseId,\n    amount: 1\n  };\n}\n/**\n * Allow add or increase amount a course\n * @param {course} course to add\n */\n\nfunction addCourse(course) {\n  if (coursesInShoppingCar.has(course.courseId)) {\n    IncreaseAmountCourse(course.courseId);\n  } else {\n    addNewCourse(course);\n  }\n}\n/**\n * Allow adding a course\n * @param {course} Course to add\n */\n\nfunction addNewCourse(course) {\n  var row = getHTMLRowElementCourse(course);\n  getShoppingCarTable().appendChild(row);\n  coursesInShoppingCar.set(course.courseId, course);\n  sinchronizeStorage();\n}\n/**\n * Increase amount of a course\n * @param {courseId} Course ID\n */\n\nfunction IncreaseAmountCourse(courseId) {\n  processAmountCourses(courseId, true);\n}\n/**\n * Delete a course\n * @param {Course to delete} courseId\n */\n\nfunction deleteCourse(courseId) {\n  var course = coursesInShoppingCar.get(courseId);\n  shoppingCarTable = getShoppingCarTable();\n\n  if (course.amount <= 1) {\n    shoppingCarTable.querySelector(\"#tableData-\".concat(courseId)).remove();\n    coursesInShoppingCar[\"delete\"](courseId);\n  } else {\n    decreaseAmountCourses(courseId);\n  }\n\n  sinchronizeStorage();\n}\n/**\n * Decrease amount of course\n * @param {Course Id} courseId\n */\n\nfunction decreaseAmountCourses(courseId) {\n  processAmountCourses(courseId, false);\n}\n/**\n * Allow increasing o decreasing the amount of a course\n * @param {courseId} Course Id\n * @param {increase} increase = true - decrease = false\n */\n\nfunction processAmountCourses(courseId, increase) {\n  var course = coursesInShoppingCar.get(courseId);\n  shoppingCarTable = getShoppingCarTable();\n  increase ? course.amount++ : course.amount--;\n  shoppingCarTable.querySelector(\"#amount-\".concat(course.courseId)).textContent = \"\".concat(course.amount);\n}\n/**\n * Get the HTML row element course\n * @param {*} course Course to be convert\n * @returns HTML row element\n */\n\nfunction getHTMLRowElementCourse(course) {\n  var title = course.title,\n      price = course.price,\n      amount = course.amount,\n      courseId = course.courseId;\n  var row = document.createElement(\"tr\");\n  row.id = \"tableData-\".concat(courseId);\n  row.innerHTML = \"      \\n          <td>\\n              <img src='./img/curso\".concat(courseId, \".jpg' width='100'>\\n          </td>\\n          <td>\").concat(title, \"</td>\\n          <td class=\\\"cell-numbers\\\">\").concat(price, \"</td>\\n          <td class=\\\"cell-numbers\\\" id='amount-\").concat(courseId, \"'>\").concat(amount, \"</td>         \\n        \");\n  var btnIncrease = getHTMLIncreaseButton(courseId);\n  var btnDelete = getHTMLDeleteButton(courseId);\n  row.appendChild(btnIncrease);\n  row.appendChild(btnDelete);\n  return row;\n}\n/**\n * Get increase button\n * @param {} courseId\n */\n\nfunction getHTMLIncreaseButton(courseId) {\n  var btnAdd = document.createElement(\"button\");\n  btnAdd.id = \"increase-course-\".concat(courseId);\n  btnAdd.classList.add(\"button-cell-courses\");\n  btnAdd.textContent = \"+\";\n  btnAdd.addEventListener(\"click\", function () {\n    IncreaseAmountCourse(courseId);\n  });\n  var blockTD = document.createElement(\"td\");\n  blockTD.classList.add(\"cell-add-course\");\n  blockTD.appendChild(btnAdd);\n  return blockTD;\n}\n/**\n * Get increase button\n * @param {} courseId\n */\n\n\nfunction getHTMLDeleteButton(courseId) {\n  var btnAdd = document.createElement(\"button\");\n  btnAdd.id = \"delete-course-\".concat(courseId);\n  btnAdd.textContent = \"-\";\n  btnAdd.classList.add(\"button-cell-courses\");\n  btnAdd.addEventListener(\"click\", function () {\n    deleteCourse(courseId);\n  });\n  var blockTD = document.createElement(\"td\");\n  blockTD.appendChild(btnAdd);\n  return blockTD;\n}\n/**\n * Sincronize data with Store\n */\n\n\nfunction sinchronizeStorage() {\n  localStorage.setItem(\"shoppingCar\", JSON.stringify(coursesInShoppingCar, replacer));\n}\n/**\n * Clean shopping car\n */\n\nfunction clearHTMLShoppingCar() {\n  coursesInShoppingCar.clear();\n  removeElementsInShoppingCarTable();\n}\n/**\n * Remove all elements\n */\n\nfunction removeElementsInShoppingCarTable() {\n  shoppingCarTable = getShoppingCarTable();\n\n  while (shoppingCarTable.firstChild) {\n    shoppingCarTable.removeChild(shoppingCarTable.firstChild);\n  }\n}\n/**\n * Display course storaged\n */\n\nfunction displayShoppingCarItems() {\n  shoppingCarTable = getShoppingCarTable();\n  coursesInShoppingCar.forEach(function (course) {\n    var row = getHTMLRowElementCourse(course);\n    shoppingCarTable.appendChild(row);\n  });\n}\n/**\n * Allow replace map values to Storage\n * @param {*} key\n * @param {*} value\n * @returns\n */\n\nfunction replacer(key, value) {\n  if (value instanceof Map) {\n    return {\n      dataType: \"Map\",\n      value: Array.from(value.entries()) // or with spread: value: [...value]\n\n    };\n  } else {\n    return value;\n  }\n}\n/**\n * Allow retrive data\n * @param {*} key\n * @param {*} value\n * @returns\n */\n\n\nfunction reviver(key, value) {\n  if (_typeof(value) === \"object\" && value !== null) {\n    if (value.dataType === \"Map\") {\n      return new Map(value.value);\n    }\n  }\n\n  return value;\n}\n/**\n * Get a courses list in the shopping car\n * @returns Get a list of course in shopping car\n */\n\n\nfunction getCoursesInShoppingCar() {\n  return coursesInShoppingCar;\n}\n/**\n * Get the shopping car table.\n * @returns Referente table\n */\n\nfunction getShoppingCarTable() {\n  if (!shoppingCarTable) {\n    shoppingCarTable = document.querySelector(\"#shoppingCarTable tbody\");\n  }\n\n  return shoppingCarTable;\n}\n\n//# sourceURL=webpack://shopping-cart/./js/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/app.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;