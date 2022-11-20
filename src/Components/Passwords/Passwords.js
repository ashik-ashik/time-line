import React, { useEffect } from 'react';
import { useState } from 'react';
import useData from '../../hooks/useData/UseData';
import Loader from '../Common/Loader/Loader';
import CreatePlatform from './Actions/CreatePlatform';
import ShowPlatform from './Actions/ShowPlatform';

const Passwords = () => {
  const {member}= useData();
  const [platform, setPlatform] = useState(null);
  const [addedplatform, setAddedPlatform] = useState(true);
  const [addNewplatform, setAddNewPlatform] = useState(false);




  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/platform/?id=${member?._id}`)
    .then(res=>res.json())
    .then(result=>setPlatform(result || []))
  },[member, addedplatform]);

    // loading...
    if(!member || !platform){
      return <Loader />
    }
  
  return (
    <article className='password-container'>
      <section className="pass-inner-container">
        <h2>My Passwords:</h2>
        <ShowPlatform platform={platform} member={member} />
        {addNewplatform && <CreatePlatform setAddedPlatform={setAddedPlatform} setAddNewPlatform={setAddNewPlatform} />}
        <div className="add-pass-btn">
          <button onClick={()=>setAddNewPlatform(true)}>Add New Platform</button>
        </div>
      </section>
    </article>
  );
};

export default Passwords;