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
      user.setUser(result.user || []);
      if(result.user){
        const member = {};
        member.name = result.user.displayName;
        member.email = result.user.email;
        member.photo = result.user.photoURL;
        member.role = result.user.email === 'ashik.free999@gmail.com' || result.user.email === 'ashik.none999@gmail.com' ? 'admin':'viewer'
        const options = {
          method: "POST",
          headers : {
            'Accept' : "application/json",
            'Content-Type' : "application/json"
          },
          body : JSON.stringify(member)
        }
        fetch(`https://radiant-refuge-40674.herokuapp.com/member`, options)
        .then(res => console.log(res.status))
        navigate('/')
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