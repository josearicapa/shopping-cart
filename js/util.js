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
 * Sincronize data with Store
 */
function sinchronizeStorage(coursesInShoppingCar) {
  localStorage.setItem(
    "shoppingCar",
    JSON.stringify(coursesInShoppingCar, replacer)
  );
}

/**
 * Get shopping courses car storaged
 * @returns Map
 */
function gestStoreShoopingCar() {
  const storage =
    JSON.parse(localStorage.getItem("shoppingCar"), reviver) || new Map([]);
  return storage;
}

export {gestStoreShoopingCar, sinchronizeStorage};
