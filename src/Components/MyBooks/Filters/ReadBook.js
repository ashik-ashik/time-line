import React from 'react';
import useData from '../../../hooks/useData/UseData';
import Showbooks from '../ShowBooks/ShowBooks';

const ReadBook = () => {
  const {books, deleteBook} = useData();
  const readBook = books?.filter(book=>book?.readingSt === 'read');
  return (
    <>
      {
        readBook?.map((book, i)=> <Showbooks book={book} key={i} i={i} deleteBook={deleteBook} />)
      }
    </>
  );
};

export default ReadBook;