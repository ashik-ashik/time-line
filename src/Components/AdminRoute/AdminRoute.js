import React from 'react';
import { Navigate } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';
import Loader from '../Common/Loader/Loader';

const AdminRoute = ({children, ...rest}) => {
  const {member, user} = useData();
  if(!member?.role || !user?.user){
    return <Loader />
  }
  if(member?.role === 'admin'){
    return children;
  }else{
    return <Navigate to='/' />
  }
};

export default AdminRoute;