import React from 'react';
import useData from '../../../hooks/useData/UseData';
import '../../../Styles/Login/Login.scss';

const LogIn = () => {
  const {user} = useData();

  const login = () => {
    user.googleLogin()
    .then((result) => {
      user.setUser(result.user || []);

          if(result.user){        
            const memb = {};
            memb.name = result.user.displayName;
            memb.email = result.user.email;
            memb.photo = result.user.photoURL;
            memb.role = result.user.email === 'mytimeline308@gmail.com' || 'ashik.none999@gmail.com' ? "admin" : 'viewer';
            
            const options = {
              method: "POST",
              headers : {
                'Accept' : "application/json",
                'Content-Type' : "application/json"
              },
              body : JSON.stringify(memb)
            }
            fetch(`https://time-line-server.vercel.app/member`, options)
               .then(res=> {
                if(res.status === 200){
                  window.location.replace('/');
                }
               })
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