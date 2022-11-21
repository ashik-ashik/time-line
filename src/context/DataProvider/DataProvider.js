import React, { createContext, useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFirebase/useFirebase';

export const DataContext = new createContext();

const DataProvider = ({children}) => {
  const [data, setData] = useState(null);
  const [member, setMember] = useState(null);
  const user = useFirebase();

  const [addedNewPost, setNewPost] = useState(false);
  const [followAddBook, setFollowBook] = useState(false)

  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/posts`)
    .then(res => res.json())
    .then(result => setData(result || []));
  }, [addedNewPost]);

  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/member/${user?.user?.email}`)
    .then(res => res.json())
    .then(result => setMember(result || []));
  },[user?.user]);

  // load books
  const [books, setBooks] = useState(null)
  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/books`)
    .then(res=>res.json())
    .then(data => setBooks(data || []))
  },[followAddBook]);
  // delete book
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

    // load passwords
  const [passwords, setPass] = useState(null);
  const [reloadPass, setReloadPass] = useState(false);
  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/password/?member=${member?._id}`)
    .then(res=>res.json())
    .then(result=>setPass(result || []))
  },[member, reloadPass]);
  
  // member.role='admin';
  
  const allData = {
    data,
    setNewPost, 
    user,
    member,
    books,
    setFollowBook,
    deleteBook,
    passwords,
    setReloadPass
  }

  return (
    <DataContext.Provider value={allData}>
      {children}
    </DataContext.Provider>
  )
};

export default DataProvider;