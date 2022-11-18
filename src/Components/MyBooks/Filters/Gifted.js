import React from 'react';
import useData from '../../../hooks/useData/UseData';
import Showbooks from '../ShowBooks/ShowBooks';

const Gifted = () => {
  const {books, deleteBook} = useData();
  const boiBrikkho = books?.filter(book=> book?.key === 'gifted');
  return (
    <>
      {
        boiBrikkho?.map((book,i)=> <Showbooks key={i} book={book} i={i} deleteBook={deleteBook} />)
      }
    </>
  );
};

export default Gifted;