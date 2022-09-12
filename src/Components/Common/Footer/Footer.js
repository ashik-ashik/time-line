import React from 'react';
import "../../../Styles/Common/footer.scss"

const Footer = () => {
  return (
    <footer>
      <small>All Right Reserves <em>Md Ashik Ali</em> &copy; {new Date().getFullYear()}</small>
    </footer>
  );
};

export default Footer;