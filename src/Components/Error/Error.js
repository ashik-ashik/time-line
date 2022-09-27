import React from 'react';
import "../../Styles/Error/Error.scss"

const Error = () => {
  return (
    <>
      <article className='container'>
        <section className="error">
          <div className='errAnimation'><span>4</span><span>0</span><span>4</span></div>
          <h2>This post is no longer</h2>
        </section>
      </article>
    </>
  );
};

export default Error;