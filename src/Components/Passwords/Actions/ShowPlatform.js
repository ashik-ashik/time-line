import React from 'react';
import { Link } from 'react-router-dom';
import "../../../Styles/Passwords/Passwords.scss"

const ShowPlatform = ({platform, member}) => {
  if(!member){
    return <h3>Just wait a moment....</h3>
  }
  return (
    <>
      <div className="platform-container">
        {
          platform?.map((plat,i)=> <div key={i}>
            <Link to={`/platforms/${plat.platform?.split(' ')?.join('-')}`}>
              {plat?.platform}
              <span className='guide'>Your {plat?.platform} account's passwords here.</span>
            </Link>
            
          </div>
          )
        }
      </div>
    </>
  );
};

export default ShowPlatform;