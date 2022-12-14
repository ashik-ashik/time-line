import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useData from '../../../hooks/useData/UseData';
import Loader from '../Loader/Loader';

const PrivateRoute = ({children, ...rest}) => {
  const {user} = useData();
  const location = useLocation();
  if(!user?.user){
    return <Loader />
  }
  if(user?.user?.email){
    return children
  } else{
    return <Navigate to='/no' state={{from:location}} />
  };
  
};

export default PrivateRoute;