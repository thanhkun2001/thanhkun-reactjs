export interface TodoListModel {
    name:string,
    priority: any,
    completed:boolean,
}
export interface TodoFilterModel {
    text?:any
}
export interface TodoStatusFilterModel {
   status?:any
}