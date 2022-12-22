import React from 'react';
import { useForm } from 'react-hook-form';
import useData from '../../../hooks/useData/UseData';

const CreatePlatform = ({setAddedPlatform, setAddNewPlatform}) => {
  const {register, handleSubmit, reset} = useForm();
  const {member} = useData();
  const addPlatform = data => {
    data.member = member?._id;
    data.platform = data?.platform?.split(' ')?.join('-');

    fetch('https://time-line-server.vercel.app/platform',{
      method: "POST",
      headers : {
        'Accept' : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(data)
    })
    .then(res=>{
      if(res.status === 200){
        reset();
      }
      setAddedPlatform(true);
      setAddNewPlatform(false);
    })
  }
  
  return (
    <div className="platform">
      <div className='add-platform-container'>
        <button onClick={()=>setAddNewPlatform(false)} className="close">&times;</button>
        <h3>Add Platform:</h3>
        <form onSubmit={handleSubmit(addPlatform)}>
          <input {...register('platform')} type="text" required placeholder='Platform Name' />
          <span className="guide">
            Here the <q>platform name</q> means which app's or website's username and password you want to save.
          </span>
          <div>
            <button type="submit">ADD platform</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlatform;