import React, { Children, useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { useLocation } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRouter = (Children) => {
    const {user,loading}  =useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return(
            <LoadingSpinner/>
        )
    }
    if(user){
        return Children;
    }
  return (
    <Navigate to="/signup" state={{from:location}}></Navigate>
  )
}

export default PrivateRouter