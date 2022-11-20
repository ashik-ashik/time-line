import React from 'react';
import { useForm } from 'react-hook-form';
import useData from '../../../hooks/useData/UseData';

const AddNewPassword = ({platform, member, toggleAddPass}) => {
  const {setReloadPass} = useData();
  const {register, handleSubmit, reset, setValue} = useForm();
  const savedPassword = JSON.parse(localStorage.getItem(`${platform}`));
  setValue('password',savedPassword);
  const samePass =(p)=>{
    const isSaved = JSON.parse(localStorage.getItem(`${platform}`));
    if(!isSaved){
      localStorage.setItem(platform, JSON.stringify(p));
    }
  }
  const postNewPass = data =>{
    data.platform = platform;
    data.member= member;
    data.phone = data.countryCode + (data.countryCode ==='+880' ? (data.phone.startsWith('0') && data.phone.slice(1)) : data.phone)
    if(data.useSamePass === 'same'){
      samePass(data.password)
    }
    // fetch to post password
    const options ={
      method: "POST",
      headers : {
        'Accept' : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(data)
    };
    fetch('https://radiant-refuge-40674.herokuapp.com/password', options)
    .then(res=>{
      if(res.status === 200){
        toggleAddPass(false);
        setReloadPass(true);
        reset();
      }
    })
  }
  return (
    <div className='add-new-pass-modal'>

      <h3>Add New Password:</h3>
      <div className="form">
        <form onSubmit={handleSubmit(postNewPass)}>
          <div className="form-field">
            <span>Email</span>
            <input {...register('email')} type="email" placeholder='Enter Email' />
          </div>
          <div className="form-field">
            <span>Phone</span>
            <div className="grid">
              <select {...register('countryCode')}>
                <option value="+880">(+880) Bangladesh</option>
                <option value="+1">(+1) US</option>
                <option value="+44">(+44) UK</option>
                <option value="+971">(971) UAE</option>
                <option value="+92">(+92) Pakistan</option>
                <option value="+91">(+91) India</option>
                <option value="+49">(+49) Germany</option>
                <option value="+33">(+33) France</option>
                <option value="+20">(+20) Egypt</option>
                <option value="+86">(+86) China</option>
                <option value="+93">(+93) Afganistan</option>
                <option value="+61">(+61) Australia</option>
                <option value="+55">(+55) Brazil</option>
              </select>
              <input {...register('phone')} type="text" inputMode='number' placeholder='1798xxxxxxx' />
            </div>
          </div>
          <div className="form-field">
            <span>Username</span>
            <input {...register('userName')} type="text" placeholder='Enter username' />
          </div>
          <div className="form-field">
            <span>Password</span>
            <input {...register('password')} required type="text" placeholder='Enter password' />
          </div>
          <div className="form-field">
            <span>Security Key</span>
            <input {...register('securityKey')} type="text" placeholder='Enter securityKey' />
          </div>
          <div className="form-field check">
            <input {...register('useSamePass')} type="checkbox" value='same' id="same" />
            {!savedPassword ? <label htmlFor="same">Use same password?</label> : <span>This platform Password has been saved as <q>Same Password</q>.</span>}
          </div>
          <div className="add-pass-btn">
            <button onClick={()=>toggleAddPass(false)}>Cancle</button>
            <button type="submit">Add Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewPassword;