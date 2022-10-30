import React from 'react';
import { Link } from 'react-router-dom';
import useData from '../../../hooks/useData/UseData';
import "../../../Styles/Common/footer.scss"

const Footer = () => {
  const {user} = useData();
  return (
    <footer>
      <small>All Right Reserves <em>Md Ashik Ali</em> &copy; {new Date().getFullYear()}</small>
      &nbsp; &nbsp;
      {
        user?.user?.length === 0 ? <Link to="/login" >Log In</Link> : <button onClick={()=> user?.logout()}>Logout</button>
      }
       
    </footer>
  );
};

export default Footer;