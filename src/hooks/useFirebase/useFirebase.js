import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const useFirebase = () => {

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  const [user, setUser] = useState(null);


  // Google login with pop up
  const googleLogin = () => {
    signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setUser(user);
    console.log(user, token);
    // ...
  }).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });
  }


  // observe is the user login or not
    // monitoring the user
    useEffect(()=>{
      // setLoading(true)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user)
          const uid = user.uid;
        } else {
          setUser(null)
        }
        // setLoading(false)
      });
    }, [auth]);
  
  return {
    user,
    googleLogin,
  };
};

export default useFirebase;