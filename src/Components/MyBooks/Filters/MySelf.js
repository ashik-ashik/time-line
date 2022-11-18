import React from 'react';
import useData from '../../../hooks/useData/UseData';
import Showbooks from '../ShowBooks/ShowBooks';

const MySelf = () => {
  const {books, deleteBook} = useData();
  const myself = books?.filter(book=> book?.collectionMt === 'buy' || 'gifted')
  return (
    <>
      {
        myself?.map((book, i)=><Showbooks key={i} deleteBook={deleteBook} book={book} i={i} />)
      }
    </>
  );
};

export default MySelf;