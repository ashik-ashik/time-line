import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import "../../Styles/MyBooks/MyBooks.scss"


const EditBook = () => {
  const {register, handleSubmit, setValue} = useForm();
  const [book, setBook] = useState(null);

  // set form default values
  setValue("bookName", book?.bookName);
  setValue("bookImg", book?.bookImg);
  setValue("writerName", book?.writerName);
  setValue("collectionMt", book?.collectionMt);
  setValue("readingSt", book?.readingSt);
  setValue("favourit", book?.favourit);
  setValue("isBorrowed", book?.isBorrowed);
  setValue("borrowedTo", book?.borrowedTo);
  setValue("borrowedAt", book?.borrowedAt);
  setValue("isreturned", book?.isreturned);
  setValue("returnedAt", book?.returnedAt);

  const {id} = useParams();

  const addBook = data => {
    console.log(data);
    if(data?.isreturned === 'yes'){
      data.isBorrowed = 'no';
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    // https://radiant-refuge-40674.herokuapp.com
    fetch(`https://radiant-refuge-40674.herokuapp.com/books/${id}`, requestOptions)
    .then(res => res.json())
    .then(result =>  {
      if(result.modifiedCount){
        window.location.replace('/mybooks');
      }
    });

  };

  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/books/${id}`)
    .then(res=>res.json())
    .then(result => setBook(result || []))
  },[id]);
  return (
    <article>
      <section className="container">
      <h1>Edit The Book</h1>
        <form onSubmit={handleSubmit(addBook)}>
          {/* book name field */}
          <div className="input-field">
            <div>
              <span>Book Name:</span>
              <input {...register('bookName')}  type="text" placeholder='Book Name' />
            </div>
          </div>

          {/* book image field */}
          <div className="input-field">
            <div>
              <span>Book Photo:</span>
              <input {...register('bookImg')} type="url" placeholder='Book Image Link' />
            </div>
          </div>

          {/* book writer name field */}
          <div className="input-field">
            <div>
              <span>Writer Name:</span>
              <input {...register('writerName')} type="text" placeholder='Writer Name' />
            </div>
          </div>

          {/* book collection method field */}
          <div className="input-field grid">
            <div>
              <span>Book Collection By:</span>
              <select {...register('collectionMt')}>
                <option value="buy">Brougth</option>
                <option value="borrowed">Borrowed</option>
                <option value="boibrikkho">Boibrikkho</option>
              </select>
            </div>
          {/* book reading status field */}
            <div>
              <span>Have read this?</span>
              <select {...register('readingSt')}>
                <option value="read">Read</option>
                <option value="reading">Reading</option>
                <option value="unread">Unread</option>
              </select>
            </div>
          </div>


          <div className="input-field grid">
          {/* is the book favourit field */}
            <div>
              <span>Is this your favourit?</span>
              <select {...register('favourit')} >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

          {/* is book borrowed ? field */}
            <div>
              <span>Have borrow this?</span>
              <select {...register('isBorrowed')}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          {/* borrowed to whom field */}
          <div className="input-field">
          <div>
            <span>Who have borrowed it?</span>
            <input {...register('borrowedTo')} type="text" placeholder='Borrowed to' />
          </div>
          </div>

          {/* when book is borrowed field */}
          <div className="input-field">
            <div>
              <span>When have borrowed it?</span>
              <input  {...register('borrowedAt')} type="date" placeholder='Borrowed at' />
            </div>
          </div>

          <div className="input-field grid">
            <div>
              <span>Is it returned?</span>
              <select {...register('isreturned')}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <span>When it is returned?</span>
              <input {...register('returnedAt')} type="date" />
            </div>
          </div>


          {/* submit button */}
          <div className="add-book-btn">
            <button type="submit">add book</button>
          </div>
        </form>
      </section>
      
    </article>
  );
};

export default EditBook;