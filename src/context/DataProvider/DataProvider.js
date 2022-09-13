import React, { createContext, useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFirebase/useFirebase';

export const DataContext = new createContext();

const DataProvider = ({children}) => {
  const [data, setData] = useState(null);
  const [addedNewPost, setNewPost] = useState(0)
  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/posts`)
    .then(res => res.json())
    .then(result => setData(result))
  }, [addedNewPost]);

  const user = useFirebase();

  console.log(addedNewPost);

  const allData = {
    data,
    setNewPost, 
    user
  }

  return (
    <DataContext.Provider value={allData}>
      {children}
    </DataContext.Provider>
  )
};

export default DataProvider;