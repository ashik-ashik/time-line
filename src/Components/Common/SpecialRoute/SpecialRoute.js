import React from 'react';
import { Navigate } from 'react-router-dom';
import useData from '../../../hooks/useData/UseData';
import Loader from '../Loader/Loader';

const SpecialRoute = ({children,...rest}) => {
  const {member, user} = useData();
  if(!member?.role || !user?.user?.email){
    return <Loader />
  }
  if(member?.role==="admin" || member?.role==='special'){
    return children;
  } else{
    return <Navigate to='/no' />
  }
};

export default SpecialRoute;