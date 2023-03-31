import React from "react"
import {useSelector} from 'react-redux'
import { Navigate, Outlet } from "react-router-dom"




function PublicRoutes(){
    const authState = useSelector(state => state.authReducer)
    console.log(localStorage.getItem('user'))
    console.log(authState+"1111")
    return(
        !authState.auth ? <Outlet/> : <Navigate to='/user'/>
    )
}

export default PublicRoutes