import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading_Component/Loading';
import { Navigate, useLocation } from 'react-router-dom';

const PriveRoute = ({ children }) => {
    const { loading, user } = useAuth()
    const location = useLocation()
    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children
    }
    return <Navigate state={location?.pathname} to={"/login"}></Navigate>

};

export default PriveRoute;