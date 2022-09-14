import React from 'react';
import { useNavigate } from 'react-router-dom';
import useData from '../../../hooks/useData/UseData';
import '../../../Styles/Login/Login.scss';

const LogIn = () => {
  const {user, setUser} = useData();
  const navigate = useNavigate();

  const login = () => {
    user.googleLogin()
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // // The signed-in user info.
      setUser(result.user);
      if(result.user){
        navigate('/home')
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
            !user?.user ? <button className='google-login' onClick={login}>Login With Google</button>
             : 
            <h2>You are logged in.</h2>
          }
          
        </div>
      </section>
    </article>
  );
};

export default LogIn;