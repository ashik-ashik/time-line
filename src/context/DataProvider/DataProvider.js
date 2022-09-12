import React, { createContext } from 'react';

export const DataContext = new createContext();

const DataProvider = ({children}) => {
  const test = {name:'Test'}
  return (
    <DataContext.Provider value={test}>
      {children}
    </DataContext.Provider>
  )
};

export default DataProvider;