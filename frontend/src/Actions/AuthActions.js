import { SET_AUTH , CLEAR_AUTH } from "../ActionTypes/AuthTypes";

export  const setAuth = () => {
    return{
        type:SET_AUTH
    }
}

export  const clearAuth = () => {
    return{
        type:CLEAR_AUTH
    }
}

