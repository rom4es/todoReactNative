export function addItem(item) {
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
}

export function editItem(item) {
  return {
    type: 'EDIT_ITEM',
    payload: item,
  };
}

export function deleteItem(id) {
  return {
    type: 'DELETE_ITEM',
    payload: id,
  };
}

export function setCompleted(id, date) {
  return {
    type: 'SET_COMPLETED',
    payload: {
      id,
      date,
    },
  };
}

export function changeFilterValue(value) {
  return {
    type: 'CHANGE_FILTER_VALUE',
    payload: value,
  };
}
