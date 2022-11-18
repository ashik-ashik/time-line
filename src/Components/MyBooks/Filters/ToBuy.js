import React from 'react';
import useData from '../../../hooks/useData/UseData';
import Showbooks from '../ShowBooks/ShowBooks';

const ToBuy = () => {
  const {books, deleteBook} = useData();
  const toBuy = books?.filter(book=> book?.key === 'tobuy');
  return (
    <>
      {
        toBuy?.map((book,i)=> <Showbooks key={i} book={book} i={i} deleteBook={deleteBook} />)
      }
    </>
  );
};

export default ToBuy;