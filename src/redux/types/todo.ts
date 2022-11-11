export const ADD_TODO = "ADD_TODO"
export const SEARCH_TEXT = "SEARCH_TEXT"
export const STATUS_FILTER = "STATUS_FILTER"
export type AddTodoList = {
    type: typeof ADD_TODO,
    payload: any
}
export type SearchText = {
    type: typeof SEARCH_TEXT,
    payload: any
}
export type Status = {
    type:typeof STATUS_FILTER,
    payload:any
}
export type TodoAction = AddTodoList | SearchText | Status