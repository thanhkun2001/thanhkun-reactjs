import { TodoFilterModel, TodoListModel, TodoStatusFilterModel } from "@/models"
import { AddTodoList, ADD_TODO, SearchText, SEARCH_TEXT, Status, STATUS_FILTER } from "../types/todo"

export const addTodoAction = (payload : TodoListModel):AddTodoList => ({
    type: ADD_TODO,
    payload,
})
export const searchFilters = (payload:TodoFilterModel):SearchText => ({
    type:SEARCH_TEXT,
    payload,
})

export const statusFilter = (payload: TodoStatusFilterModel):Status => ({
    type:STATUS_FILTER,
    payload
})