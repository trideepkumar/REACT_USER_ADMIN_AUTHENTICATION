import { combineReducers } from "redux"
import authReducer from "./AuthReducers"

const rootReducer = combineReducers({
    authReducer : authReducer
})

export default rootReducer