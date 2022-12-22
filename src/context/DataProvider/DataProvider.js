import React, { createContext, useEffect, useState } from 'react';
import { useReducer } from 'react';
import { error, loadBooks, loading, loadPosts } from '../../hooks/actionCreator/actionCreator';
import { dataReducer, initialState } from '../../hooks/dataReducer/dataReducer';
import useFirebase from '../../hooks/useFirebase/useFirebase';

export const DataContext = new createContext();

const DataProvider = ({children}) => {
  const [reloadMember, setReloadMember] = useState(false);
  const [member, setMember] = useState(null);
  const user = useFirebase();
  const [state, dispatch] = useReducer(dataReducer, initialState);
  // console.log(state.posts);

  const [addedNewPost, setNewPost] = useState(false);
  const [followAddBook, setFollowBook] = useState(false)
	// https://time-line-server.vercel.app/posts
  useEffect(()=>{
    dispatch(()=>loading());
    try{
      fetch(`https://time-line-server.vercel.app/posts`)
    .then(res => res.json())
    .then(result => dispatch(loadPosts(result || [])));
    }catch (err) {
      console.log(err);
      dispatch(()=>error('Fail to load!'));
    }
  }, [addedNewPost]);

  useEffect( ()=>{
    const fetchData = async () => {
      try {
        let response = await fetch(`https://time-line-server.vercel.app/member/${user?.user?.email}`);
        if (response.status === 200) {
            let data = await response.json();
            setMember(data || {});
            setReloadMember(false)
        }
      } catch (err) {
        console.log(err);
          // setIsError(true)
      }
    }
    fetchData();
  },[user?.user?.email, reloadMember]);

  // load books
  useEffect(()=>{
    try{
      fetch(`https://time-line-server.vercel.app/books`)
    .then(res=>res.json())
    .then(data => dispatch(loadBooks(data || [])));
    setFollowBook(false)
    } catch (err){

    }
  },[followAddBook]);
  // delete book
    // delete a books
    const deleteBook = id => {
      const sureDel = window.confirm("Are you Sure to delete the Book");
      if(sureDel){
        fetch(`https://time-line-server.vercel.app/book/${id}`,{
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
    fetch(`https://time-line-server.vercel.app/password/?member=${member?._id}`)
    .then(res=>res.json())
    .then(result=>setPass(result || []));
    setReloadPass(false)
  },[member, reloadPass]);
  
  // member.role='admin';
  const [observeAddNewPay, setObserveAddNewPay]= useState(false);
  const [observeAddNewCost, setObserveAddNewCost] = useState(false);

  
  const allData = {
    data: state.posts,
    setNewPost, 
    user,
    member,
    setReloadMember,
    books: state.books,
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