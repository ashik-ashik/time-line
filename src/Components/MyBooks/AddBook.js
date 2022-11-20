import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation } from 'react-router-dom';
import "../../Styles/MyBooks/MyBooks.scss"


const AddBook = () => {
  const {register, handleSubmit} = useForm();
  const location = useLocation();

  const addBook = data => {
    console.log(data);
    data.isreturned = '';
    // https://radiant-refuge-40674.herokuapp.com
    fetch(`https://radiant-refuge-40674.herokuapp.com/books`, {
      method: "POST",
      headers : {
        'Accept' : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(data)
    })
    .then(res => {
      if(res.status === 200){
        // window.location.replace(`/${location}`);
        <Navigate to={location} />
      }
    });

  }
  return (
    <article>
      <section className="container">
        <h1>Add New Books to List</h1>
        <form onSubmit={handleSubmit(addBook)}>
          {/* book name field */}
          <div className="input-field">
            <span>Book Name:</span>
            <input {...register('bookName')} type="text" placeholder='Book Name' />
          </div>

          {/* book image field */}
          <div className="input-field">
            <span>Book Photo:</span>
            <input {...register('bookImg')} type="url" placeholder='Book Image Link' />
          </div>

          {/* book writer name field */}
          <div className="input-field">
            <span>Writer Name:</span>
            <input {...register('writerName')} type="text" placeholder='Writer Name' />
          </div>

          {/* book story field */}
          <div className="input-field">
            <div>
              <span>Story within one word:</span>
              <input {...register('story')} type="text" placeholder='Main Story' />
            </div>
          </div>

          <div className="input-field grid">
          {/* Number of page */}
            <div>
              <span>Number of pages:</span>
              <input {...register('page')} placeholder='Number of pages' type="number" />
            </div>

          {/* book price field */}
            <div>
              <span>Price of Book:</span>
              <input {...register('price')} placeholder='Price' type="number" />
            </div>
          </div>

          <div className="input-field grid">

            {/* book collection method field */}
            <div>
              <span>Book Collection By:</span>
              <select {...register('collectionMt')}>
                <option value="buy">Brougth</option>
                <option value="gifted">Gifted</option>
                <option value="borrowed">Borrowed</option>
                <option value="boibrikkho">Boibrikkho</option>
                <option value="tobuy">To Buy</option>
                <option value="digital">Digital</option>
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

          {/* categories and filter key */}
          <div className="input-field grid">

            {/* book Categories */}
            <div>
              <span>Book Categories:</span>
              <select {...register('type')}>
                <option value="উপন্যাস">উপন্যাস</option>
                <option value="থ্রিলার">থ্রিলার</option>
                <option value="আত্ম-উন্নয়োন">আত্ম উন্নয়োনমূলক</option>
                <option value="প্রবন্ধ">প্রবন্ধ</option>
                <option value="নাটক">নাটক</option>
                <option value="ব্যবসা-আর্থিক">ব্যবসায় ও আর্থিক</option>
                <option value="কবিতা">কবিতা</option>
                <option value="islamic">Islamic</option>
              </select>
            </div>

            {/* book filter */}
            <div>
              <span>Filter key:</span>
              <select {...register('key')}>
                <option value="read">Read</option>
                <option value="toread">To Read</option>
                <option value="tobuy">To Buy</option>
                <option value="boibrikkho">Boibrikkho</option>
                <option value="gifted">Gifted</option>
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
            <span>Who have borrowed it?</span>
            <input {...register('borrowedTo')} type="text" placeholder='Borrowed to' />
          </div>

          {/* when book is borrowed field */}
          <div className="input-field">
            <span>When it is returned?</span>
            <input  {...register('borrowedAt')} type="date" placeholder='Borrowed at' />
          </div>

          

          {/* submit button */}
          <div className="add-book-btn">
            <Link to='/mybooks'>back</Link>
            <button type="submit">add book</button>
          </div>
        </form>
      </section>
    </article>
  );
};
/*
name:'Rich Dad Poor Dad', 
      writer:'Rechart T Kiosaki', 
      collectionMethod:'Brougth',
      collectionMethodDate:'10/18/2022',
      readingStatus:"Reading", 
      borrowStatus:'No',
      borrowedTo:'No one',
      borrowedDate:'11/18/2022',
      review:'Can be a large text.',
      faviourit:true
      */ 

export default AddBook;