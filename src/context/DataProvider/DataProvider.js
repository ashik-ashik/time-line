import React, { createContext, useEffect, useState } from 'react';
import useFirebase from '../../hooks/useFirebase/useFirebase';

export const DataContext = new createContext();

const DataProvider = ({children}) => {
  const [data, setData] = useState(null);
  const [reloadMember, setReloadMember] = useState(false);
  const [member, setMember] = useState(null);
  const user = useFirebase();

  const [addedNewPost, setNewPost] = useState(false);
  const [followAddBook, setFollowBook] = useState(false)
	// https://time-line-server-ashikfree999.vercel.app/posts
  useEffect(()=>{
    fetch(`https://time-line-server-ashikfree999.vercel.app/posts`)
    .then(res => res.json())
    .then(result => setData(result || []));
  }, [addedNewPost]);

  useEffect( ()=>{
    const fetchData = async () => {
      try {
        let response = await fetch(`https://time-line-server-ashikfree999.vercel.app/member/${user?.user?.email}`);
        if (response.status === 200) {
            let data = await response.json();
            setMember(data || {});
            setReloadMember(false)
        }
      } catch (error) {
          // setIsError(true)
      }
    }
    fetchData();
  },[user?.user?.email, reloadMember]);

  // load books
  const [books, setBooks] = useState(null)
  useEffect(()=>{
    fetch(`https://time-line-server-ashikfree999.vercel.app/books`)
    .then(res=>res.json())
    .then(data => setBooks(data || []));
    setFollowBook(false)
  },[followAddBook]);
  // delete book
    // delete a books
    const deleteBook = id => {
      const sureDel = window.confirm("Are you Sure to delete the Book");
      if(sureDel){
        fetch(`https://time-line-server-ashikfree999.vercel.app/book/${id}`,{
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
    fetch(`https://time-line-server-ashikfree999.vercel.app/password/?member=${member?._id}`)
    .then(res=>res.json())
    .then(result=>setPass(result || []));
    setReloadPass(false)
  },[member, reloadPass]);
  
  // member.role='admin';
  const [observeAddNewPay, setObserveAddNewPay]= useState(false);
  const [observeAddNewCost, setObserveAddNewCost] = useState(false);

  
  const allData = {
    data,
    setNewPost, 
    user,
    member,
    setReloadMember,
    books,
    setFollowBook,
    deleteBook,
    passwords,
    setReloadPass,
    observeAddNewCost,
    observeAddNewPay,
    setObserveAddNewPay,
    setObserveAddNewCost
  }

  return (
    <DataContext.Provider value={allData}>
      {children}
    </DataContext.Provider>
  )
};

export default DataProvider;