import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

const useFirebase = () => {

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  const [user, setUser] = useState(null);


  // Google login with pop up
  const googleLogin = () => {
   return signInWithPopup(auth, googleProvider)
  }


  // observe is the user login or not
    // monitoring the user
    useEffect(()=>{
      // setLoading(true)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user || [])
          const uid = user.uid;
        } else {
          setUser([])
        }
        // setLoading(false)
      });
    }, [auth]);


    // log out user
    const logout = () => {
      signOut(auth).then(() => {
        setUser([])
      }).catch((error) => {
        console.log(error.message);
      });
      
    }
  
  return {
    user,
    googleLogin,
    setUser,
    logout,
  };
};

export default useFirebase;