import React from 'react';
import useData from '../../../hooks/useData/UseData';
import Showbooks from '../ShowBooks/ShowBooks';

const ToRead = () => {
  const {books, deleteBook} = useData();
  const toRead = books?.filter(book=> book?.key === 'toread');
  return (
    <>
      {
        toRead?.map((book,i)=> <Showbooks key={i} book={book} i={i} deleteBook={deleteBook} />)
      }
    </>
  );
};

export default ToRead;