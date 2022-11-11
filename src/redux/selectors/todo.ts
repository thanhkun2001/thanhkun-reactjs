import { AppState } from '../reducer'
import { createSelector } from 'reselect'
export const todoListSelector = (state: AppState) => state.todo.todoLists
export const statusFilter = (state: AppState) => state.todo.filters.status
export const searchTextSelector = (state: AppState) => state.todo.filters.search
export const todosRemainingSelector = createSelector(
  todoListSelector,
  statusFilter,
  searchTextSelector,
  (todoList, status, searchText) => {
    return todoList.filter((todo) => {
      if (status === 'All') {
        return todo.name.includes(searchText)
      }
      return (
        todo.name.includes(searchText) &&
        (status === 'Completed' ? todo.completed : !todo.completed)
      )
    })
  }
)
