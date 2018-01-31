import { combineReducers } from "redux"

import columnData from "./columnDataReducer"
import rowData from "./rowDataReducer"
import authReducer from "./authReducer"

const rootReducer = combineReducers({
  rowData,
  columnData,
  authReducer
})

export default rootReducer;
