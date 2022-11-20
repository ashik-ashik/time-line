import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useData from '../../../hooks/useData/UseData';
import '../../../Styles/Login/Login.scss';

const LogIn = () => {
  const {user} = useData();
  const [findMember, setMember] = useState(null);

    // check is the member logged in previous
    useEffect(()=>{
      fetch(`https://radiant-refuge-40674.herokuapp.com/members`)
      .then(res=>res.json())
      .then(result=> setMember(result));
    },[user?.user])
    const isAlreadyMember = findMember?.find(mem=> mem?.email === user?.user?.email);
    // console.log(findMember, isAlreadyMember);

  const login = async () => {
    user.googleLogin()
    .then((result) => {
      
      user.setUser(result.user || []);
      if(result.user && !isAlreadyMember){        
        const memb = {};
        memb.name = result.user.displayName;
        memb.email = result.user.email;
        memb.photo = result.user.photoURL;
        memb.role = result.user.email === 'ashik.free999@gmail.com' || result.user.email === 'ashik.none999@gmail.com' ? 'admin':'viewer'
        const options = {
          method: "POST",
          headers : {
            'Accept' : "application/json",
            'Content-Type' : "application/json"
          },
          body : JSON.stringify(memb)
        }
        fetch(`https://radiant-refuge-40674.herokuapp.com/member`, options)
        .then(res => console.log(res.status))
        window.location.replace('/')


      }
      // ...
    }).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      // ...
    });
  }
  return (
    <article className='container'>
      <section className='login'>
        <div className="design-login">
          <img src="https://i.postimg.cc/TwQKdfxq/hero-1.png" alt="loginimage" />
        </div>
        <div className="login-action">
          {
            user?.user?.length === 0 ? <button className='google-login' onClick={login}>Login With Google</button>
             : 
            <h2>You are logged in.</h2>
          }
          
        </div>
      </section>
    </article>
  );
};

export default LogIn;