import React from 'react';
import useData from '../../../hooks/useData/UseData';
import Showbooks from '../ShowBooks/ShowBooks';

const AllBooks = () => {
  const {books, deleteBook} = useData();
  return (
    <>
      {
        books?.map((book,i)=> <Showbooks key={i} book={book} i={i} deleteBook={deleteBook} />)
      }
    </>
  );
};

export default AllBooks;