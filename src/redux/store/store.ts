import createSagaMiddleware from "redux-saga"
import { createStore, applyMiddleware } from 'redux'
import { rootSaga } from "../saga"
import rootReducer from "../reducer"
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)


export default store