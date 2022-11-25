import React from 'react';
import { Link } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';
import "../../Styles/Error/Error.scss"

const Error = () => {
  const {user} = useData();
  return (
    <>
      <article className='container'>
        <section className="error">
          <div className='errAnimation'><span>4</span><span>0</span><span>4</span></div>
          <h2>The Content is not Avaiable</h2>
          <div className='return-btn'>
            {
              user?.user?.email ? <Link to='/'>Back to home</Link> : <>
                <Link to="/login">Log In</Link>
              </>
            }
          </div>
        </section>
      </article>
    </>
  );
};

export default Error;