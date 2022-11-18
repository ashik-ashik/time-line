import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';
import "../../Styles/MyBooks/MyBooks.scss"
import Showbooks from './ShowBooks/ShowBooks';

const MyBooks = () => {
  const {books, deleteBook} = useData();



  
  
  return (
    <article>
      <section className="container">
        <h1>My Book List:</h1><br />
        <div className="book-menu">
            <ul>
              <li>
                <NavLink to='myself'>MySelf</NavLink>
              </li>
              <li>
                <NavLink to='read'>Read</NavLink>
              </li>
              <li>
                <NavLink to='toread'>To Read</NavLink>
              </li>
              <li>
                <NavLink to='tobuy'>To Buy</NavLink>
              </li>
              <li>
                <NavLink to='gifted'>Gifted</NavLink>
              </li>
              <li>
                <NavLink to='boibrikkho'>BoiBrikkho</NavLink>
              </li>
            </ul>
          </div>
        <div className="mybooks-selfs">
          <table className="mybooks-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name:</th>
                <th>Writer:</th>
                <th>Type:</th>
                <th>Story:</th>
                <th>Page:</th>
                <th>Price:</th>
                <th>Collection:</th>
                <th>Reading Status:</th>
                <th>Borrow Status:</th>
                <th>Borrowed To:</th>
                <th>Borrowed At:</th>
                <th>Action:</th>
              </tr>
            </thead>
            <tbody>
              {!books && <tr><td style={{fontWeight:'700'}} colSpan={10}>Loading...</td></tr>}
              <Outlet />
            </tbody>
          </table>
          <p>&nbsp;</p>
        </div>
        
          <Link to='/addbook' className='add-new-book'>+ Add New Book</Link>
      </section>
    </article>
  );
};



export default MyBooks;