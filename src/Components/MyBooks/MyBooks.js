import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../Styles/MyBooks/MyBooks.scss"

const MyBooks = () => {
  const [books, setBooks] = useState(null)
  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/books`)
    .then(res=>res.json())
    .then(data => setBooks(data || []))
  },[]);
  // console.log(books);

  // delete a books
  const deleteBook = id => {
    const sureDel = window.confirm("Are you Sure to delete the Book");
    if(sureDel){
      fetch(`https://radiant-refuge-40674.herokuapp.com/book/${id}`,{
        method: "DELETE"
      })
      .then(res=>res.json())
      .then(result => {
        if(result.deletedCount){
          window.location.reload()
        }
      })
    }
  }
  
  return (
    <article>
      <section className="container">
        <div className="mybooks-selfs">
          <h1>My Book List:</h1><br />
          <table className="mybooks-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name:</th>
                <th>Writer:</th>
                <th>Collection:</th>
                <th>Reading Status:</th>
                <th>Borrow Status:</th>
                <th>Borrowed To:</th>
                <th>Borrowed At:</th>
                <th>Action:</th>
              </tr>
            </thead>
            <tbody>
              {!books && <h2>Loading...</h2>}
              {
                books?.map((book,i)=> <Showbooks deleteBook={deleteBook} book={book} i={i} key={i} />)
              }
            </tbody>
          </table>
          <p>&nbsp;</p>
        </div>
          <Link to='/addbook' className='add-new-book'>+ Add New Book</Link>
      </section>
    </article>
  );
};

const Showbooks = ({deleteBook, book,i}) =>{
  return (<tr>
            <td>{i+1 <10 ? ('0'+(i+1)) : (i+1)}</td>
            <td>{book?.bookName}</td>
            <td>{book?.writerName}</td>
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

export default MyBooks;