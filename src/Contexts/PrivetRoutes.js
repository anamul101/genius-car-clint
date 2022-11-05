import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivetRoutes = ({children}) => {
    const {user,loader} = useContext(AuthContext);
    const location = useLocation()
    if(loader){
        return <div className='text-center text-green-600 text-2xl font-bold my-40'>Loading...</div>
    }
    if(user){
        return children;
    }
    return <Navigate to='/lognin' state={{from:location}} replace ></Navigate>
};

export default PrivetRoutes;