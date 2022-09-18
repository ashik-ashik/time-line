import React, { createContext, useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFirebase/useFirebase';

export const DataContext = new createContext();

const DataProvider = ({children}) => {
  const [data, setData] = useState(null);
  const [member, setMember] = useState(null);
  const user = useFirebase();

  const [addedNewPost, setNewPost] = useState(false);

  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/posts`)
    .then(res => res.json())
    .then(result => setData(result))
  }, [addedNewPost]);

  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/member/${user?.user?.email}`)
    .then(res => res.json())
    .then(result => setMember(result))
  },[user?.user]);

  

  const allData = {
    data,
    setNewPost, 
    user,
    member,
  }

  return (
    <DataContext.Provider value={allData}>
      {children}
    </DataContext.Provider>
  )
};

export default DataProvider;