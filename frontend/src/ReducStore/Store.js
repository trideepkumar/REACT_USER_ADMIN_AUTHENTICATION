import {configureStore , applyMiddleware} from '@reduxjs/toolkit'
import {composeWithDevTools} from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import authReducer from '../Reducers/AuthReducers'



const store = configureStore({reducer : authReducer},composeWithDevTools(applyMiddleware(thunk)))

export default store