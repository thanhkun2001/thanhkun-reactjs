import { combineReducers } from "redux";
import TodoReducer from "./Todo";
const rootReducer = combineReducers({
    todo:TodoReducer
})
export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;