import {expect} from "@jest/globals";
import {
  addCourse,
  getCourseFromCard,
  loadEventListeners,
  getCoursesInShoppingCar,
  deleteCourse,
  clearHTMLShoppingCar,
  shoppingCarTable,
  eventAddCourse,
} from "./app";
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

jest.dontMock("fs");

beforeEach(() => {
  document.documentElement.innerHTML = html.toString();
});

afterEach(() => {
  clearHTMLShoppingCar();
});

describe("Validate initial values ", () => {
  test("should be get a object course ", () => {
    const courseCard = document.querySelector(".card");
    const course = getCourseFromCard(courseCard, 1);
    expect(course.title).toBeDefined();
    expect(course.price).toBeDefined();
    expect(course.courseId).toBeDefined();
    expect(course.amount).toBeDefined();
  });

  test("should be initial course list ", () => {
    loadEventListeners();
    window.document.dispatchEvent(
      new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true,
      })
    );

    const coursesList = getCoursesInShoppingCar();
    expect(coursesList).toBeDefined();
  });

  test("should be display a courses list storaged ", () => {
    loadEventListeners();
    const course = {
      title: "Course JS",
      price: "$500",
      courseId: 1,
      amount: 1,
    };

    addCourse(course);

    window.document.dispatchEvent(
      new Event("DOMContentLoaded", {
        bubbles: true,
        cancelable: true,
      })
    );

    const coursesList = getCoursesInShoppingCar();
    expect(coursesList).toBeDefined();
  });
});

describe("Add courses at shopping car", () => {
  test("should be add a course", () => {
    const course = {
      title: "Course JS",
      price: "$500",
      courseId: 1,
      amount: 1,
    };

    addCourse(course);

    const coursesList = getCoursesInShoppingCar();
    expect(coursesList.size).toBe(1);
  });

  test("should be add 2 courses", () => {
    const course = {
      title: "Course JS",
      price: "$500",
      courseId: 1,
      amount: 1,
    };

    const course2 = {
      title: "Course JS 2",
      price: "$1500",
      courseId: 2,
      amount: 1,
    };

    addCourse(course);
    addCourse(course2);

    const coursesList = getCoursesInShoppingCar();
    expect(coursesList.size).toBe(2);
  });

  test("should be the same course 3 times", () => {
    const course = {
      title: "Course JS",
      price: "$500",
      courseId: 1,
      amount: 1,
    };

    addCourse(course);
    addCourse(course);
    addCourse(course);

    const coursesList = getCoursesInShoppingCar();
    expect(coursesList.size).toBe(1);
    expect(coursesList.get(1).amount).toBe(3);
  });

  test("should be add a course by event", () => {
    const courseCard = document.querySelector(".card");
    const btnAddCourse = courseCard.querySelector(".add-shopping-car");
    eventAddCourse(btnAddCourse);
    const coursesList = getCoursesInShoppingCar();
    expect(coursesList.size).toBe(1);
  });
});

describe("Delete courses at shopping car", () => {
  test("should be delete a course", () => {
    const course = {
      title: "Course JS",
      price: "$500",
      courseId: 1,
      amount: 1,
    };

    addCourse(course);
    deleteCourse(course.courseId);

    const coursesList = getCoursesInShoppingCar();
    expect(coursesList.size).toBe(0);
  });

  test("should be delete 2 courses", () => {
    const course = {
      title: "Course JS",
      price: "$500",
      courseId: 1,
      amount: 1,
    };

    const course2 = {
      title: "Course JS 2",
      price: "$1500",
      courseId: 2,
      amount: 1,
    };

    addCourse(course);
    addCourse(course2);

    deleteCourse(course.courseId);
    deleteCourse(course2.courseId);

    const coursesList = getCoursesInShoppingCar();
    expect(coursesList.size).toBe(0);
  });

  test("should be delete 3 items at the same course ", () => {
    const course = {
      title: "Course JS",
      price: "$500",
      courseId: 1,
      amount: 1,
    };

    addCourse(course);
    addCourse(course);
    addCourse(course);

    deleteCourse(course.courseId);
    deleteCourse(course.courseId);
    deleteCourse(course.courseId);

    const coursesList = getCoursesInShoppingCar();
    expect(coursesList.size).toBe(0);
  });
});
