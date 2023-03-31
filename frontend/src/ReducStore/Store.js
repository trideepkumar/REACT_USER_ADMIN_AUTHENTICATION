import {configureStore , applyMiddleware, createStore} from '@reduxjs/toolkit'
import {composeWithDevTools} from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import authReducer from '../Reducers/AuthReducers'
import rootReducer from '../Reducers/CombineReducer'


const store = configureStore({reducer : rootReducer},composeWithDevTools(applyMiddleware(thunk)))
// const store = createStore(authReducer, applyMiddleware(thunk));


export default store