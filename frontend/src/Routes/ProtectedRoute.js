import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){
    const authState = useSelector(state => state.authReducer)
    return(
        authState.auth ? <Outlet/> : <Navigate to='/login' />
    )
} 

export default ProtectedRoute