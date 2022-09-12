import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider/DataProvider';

const useData = () => {
  return useContext(DataContext);
};

export default useData;