import React from 'react';
import { Link } from 'react-router-dom';

const Showbooks = ({deleteBook, book,i}) =>{
  return (<tr>
            <td>{i+1 <10 ? ('0'+(i+1)) : (i+1)}</td>
            <td>{book?.bookName}</td>
            <td>{book?.writerName}</td>
            <td>{book?.type}</td>
            <td>{book?.collectionMt}</td>
            <td>{book?.readingSt}</td>
            <td>{book?.isBorrowed}</td>
            <td>{book?.isreturned ==='no' && book?.borrowedTo}</td>
            <td>{book?.isreturned ==='no' && book?.borrowedAt}</td>
            <td>
              <Link to={`/editbook/${book?._id}`} className='edit'>Edit</Link>
              <button onClick={()=>deleteBook(book?._id)} className='del'>Del</button>
            </td>
          </tr>
          )
}

export default Showbooks;