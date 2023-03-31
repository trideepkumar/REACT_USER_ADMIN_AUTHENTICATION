import { SET_AUTH,CLEAR_AUTH } from "../ActionTypes/AuthTypes"

const intialState ={
    auth : JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null 
}

const authReducer = (state = intialState , action ) => {
    switch(action.type){
        case SET_AUTH : 
            return{
                auth : JSON.parse(localStorage.getItem('user'))
            }
        case CLEAR_AUTH :
            return{
                auth : null
            }
        default : return state
    }
}

export  default authReducer