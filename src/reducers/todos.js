const initialState = {
  todos: [],
  nextID: 1,
  filterValue: 0,
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      action.payload.id = state.nextID;
      return {
        ...state,
        todos: [...state.todos, action.payload],
        nextID: state.nextID + 1,
      };
    case 'EDIT_ITEM':
      return {
        ...state,
        todos: state.todos.map(item => {
          return item.id === action.payload.id ? action.payload : item;
        }),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.payload),
      };
    case 'SET_COMPLETED':
      return {
        ...state,
        todos: state.todos.map(item => {
          return item.id === action.payload.id
            ? {...item, completed: action.payload.date}
            : item;
        }),
      };
    case 'CHANGE_FILTER_VALUE':
      return {
        ...state,
        filterValue: action.payload,
      };
    default:
      return state;
  }
};

export default todos;
