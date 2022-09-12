import React from 'react';
import {Link} from 'react-router-dom';
import "../../../Styles/Common/header.scss"

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to='/'><img src="https://i.postimg.cc/4ND07BXk/mtl.png" alt="logo" /></Link>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link className='link' to='/'>Home</Link>
            </li>
            <li>
              <Link className='link' to='/timeline'>Timeline</Link>
            </li>
            <li>
              <Link className='link' to='/dairy'>Dairy</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;