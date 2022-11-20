import React from 'react';
import '../../../Styles/Common/Loader.scss'

const Loader = () => {
  return (
    <div className='loader-container'>
      <div className="inner-loader">
        <div className="loader-content">
          <div className="loader-content-1">
            <div className="loader-content-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;