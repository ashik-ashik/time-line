import React from 'react';
import { Link } from 'react-router-dom';

const Showbooks = ({deleteBook, book,i}) =>{
  return (<tr key={i}>
            <td className={book.favourit === 'yes' ? 'fav' : ''}>{i+1 <10 ? ('0'+(i+1)) : (i+1)}</td>
            <td>{book?.bookName}</td>
            <td>{book?.writerName}</td>
            <td>{book?.type}</td>
            <td>{book?.story}</td>
            <td>{book?.page}</td>
            <td>{book?.price} {book?.price && 'TK.'}</td>
            <td>{book?.collectionMt}</td>
            <td>{book?.readingSt}</td>
            <td>{book?.isBorrowed}</td>
            <td>{book?.isreturned ==='no' && book?.borrowedTo}</td>
            <td>{book?.isreturned ==='no' && book?.borrowedAt}</td>
            <td>{i+1 <10 ? ('0'+(i+1)) : (i+1)}</td>
            <td>
              <Link to={`/editbook/${book?._id}`} className='edit'>Edit</Link>
              <button onClick={()=>deleteBook(book?._id)} className='del'>Del</button>
            </td>
          </tr>
          )
}

export default Showbooks;