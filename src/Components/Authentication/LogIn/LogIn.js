import React from 'react';
import useData from '../../../hooks/useData/UseData';
import '../../../Styles/Login/Login.scss';

const LogIn = () => {
  const {user} = useData();
  return (
    <article className='container'>
      <section className='login'>
        <div className="design-login">
          <img src="https://i.postimg.cc/TwQKdfxq/hero-1.png" alt="loginimage" />
        </div>
        <div className="login-action">
          {
            !user?.user ? <button className='google-login' onClick={user.googleLogin}>Login With Google</button>
             : 
            <h2>You are logged in.</h2>
          }
          
        </div>
      </section>
    </article>
  );
};

export default LogIn;