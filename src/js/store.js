import { applyMiddleware, createStore } from "redux"

import promise from "redux-promise-middleware"
import thunk from "redux-thunk"
import { createLogger } from "redux-logger"

import reducer from "./backup/reducers/index"

export default createStore(reducer, applyMiddleware(promise(), thunk, createLogger()))
