import React, { useEffect } from 'react';
import { useState } from 'react';
import useData from '../../hooks/useData/UseData';
import Loader from '../Common/Loader/Loader';
import CreatePlatform from './Actions/CreatePlatform';
import ShowPlatform from './Actions/ShowPlatform';

const Passwords = () => {
  const {member}= useData();
  const [platform, setPlatform] = useState(null);
  const [addedplatform, setAddedPlatform] = useState(false);
  const [addNewplatform, setAddNewPlatform] = useState(false);

  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/platform/?id=${member?._id}`)
    .then(res=>res.json())
    .then(result=>setPlatform(result || []));
    setAddedPlatform(false)
  },[member, addedplatform]);

    // loading...
    if(!member || !platform){
      return <Loader />
    }
  
  return (
    <article className='password-container'>
        {addNewplatform && <CreatePlatform setAddedPlatform={setAddedPlatform} setAddNewPlatform={setAddNewPlatform} />}
      <section className="pass-inner-container">
        <h2>My Passwords:</h2>
        <ShowPlatform platform={platform} setAddedPlatform={setAddedPlatform} member={member} />
        <div className="add-pass-btn">
          <button onClick={()=>setAddNewPlatform(true)}>Add New Platform</button>
        </div>
      </section>
    </article>
  );
};

export default Passwords;