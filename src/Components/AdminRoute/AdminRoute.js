import React from 'react';
import { Navigate } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';
import Loader from '../Common/Loader/Loader';

const AdminRoute = ({children, ...rest}) => {
  const {member} = useData();
  if(!member){
    return <Loader />
  }
  if(member?.role === 'admin'){
    return children;
  }else{
    return <Navigate to='/' />
  }
};

export default AdminRoute;