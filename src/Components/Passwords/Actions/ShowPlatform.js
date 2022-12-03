import React from 'react';
import { Link } from 'react-router-dom';
import "../../../Styles/Passwords/Passwords.scss"

const ShowPlatform = ({platform, member, setAddedPlatform}) => {
  if(!member?.role){
    return <h3>Just wait a moment....</h3>
  }
  const deletePlatform = (id, platform) => {
    fetch(`https://time-line-server-mdashik989.vercel.app/delete-platform?id=${id}&platform=${platform}`, {method:"DELETE"})
    .then(res=>{
      if(res.status === 200){
        setAddedPlatform(true);
      };
    })
  }
  return (
    <>
      <div className="platform-container">
        {
          platform?.length > 0 ? platform?.map((plat,i)=> <div key={i}>
            <Link to={`/platforms/${plat.platform?.split(' ')?.join('-')}`}>
              {plat?.platform}
              <span className='guide'>Your account's passwords here.</span>
            </Link>
            <span onClick={()=>deletePlatform(plat?._id, plat?.platform)} className='platform-delete'>&#8861;</span>
          </div>
          ) : <>
          <h4>There is no platform added.</h4>
          </>
        }
      </div>
    </>
  );
};

export default ShowPlatform;