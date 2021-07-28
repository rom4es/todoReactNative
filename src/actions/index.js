/**
 * Добавление todo
 * @param {object} item todo
 * @returns object
 */
export function addItem(item) {
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
}

/**
 * Изменение todo
 * @param {object} item todo
 * @returns object
 */
export function editItem(item) {
  return {
    type: 'EDIT_ITEM',
    payload: item,
  };
}

/**
 * Удаление todo
 * @param {string} id
 * @returns object
 */
export function deleteItem(id) {
  return {
    type: 'DELETE_ITEM',
    payload: id,
  };
}

/**
 * Отметить todo как выполненное
 * @param {string} id
 * @param {object} date дата выполнения
 * @returns object
 */
export function setCompleted(id, date) {
  return {
    type: 'SET_COMPLETED',
    payload: {
      id,
      date,
    },
  };
}

/**
 * Изменить значения фильтра
 * @param {string} value
 * @returns object
 */
export function changeFilterValue(value) {
  return {
    type: 'CHANGE_FILTER_VALUE',
    payload: value,
  };
}
