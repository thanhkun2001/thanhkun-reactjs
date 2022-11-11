import { ADD_TODO, SEARCH_TEXT, STATUS_FILTER } from '../types/todo'

const initValue = {
  filters: {
    search: '',
    status: 'All',
    priority: [],
  },
  todoLists: [
    { id: 1, name: 'Learn CSS', completed: false, priority: 'Medium' },
    { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
    { id: 3, name: 'Learn SCSS', completed: false, priority: 'Low' },
  ],
}

const TodoReducer = (state = initValue, action: any) => {
  console.log(state, action)
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoLists: [...state.todoLists, action.payload],
      }
    case SEARCH_TEXT:
      return {
        ...state,
        filters: { ...state.filters, search: action.payload },
      }
      case STATUS_FILTER:
        return {
          ...state,
          filters: { ...state.filters, status: action.payload },
        }
    default:
      return state
  }
}
export default TodoReducer
