import React from 'react';
import { Link, useParams } from 'react-router-dom';
import ShowPasswords from './ShowPasswords';
import "../../../Styles/Passwords/Passwords.scss"
import { useState } from 'react';
import useData from '../../../hooks/useData/UseData';
import AddNewPassword from './AddNewPassword';
import Loader from '../../Common/Loader/Loader';

const AccountPasswords = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {platform} = useParams();
  const {member, passwords}=useData();
  const [showAddPass, setAddPass] = useState(false);

  if(!passwords){
    return <Loader />
  }

  // filter pass works by platform
  const toShowPass = passwords?.filter(pass=> pass.platform === platform);


  // toggle password show and hide
  const changePassState = ()=>{
    setShowPassword(document.getElementById("check").checked);
  }

  // toggle add password modal
  const toggleAddPass = t =>{
    setAddPass(t)
  }

  return (
    <article className='password-container'>
      {
          showAddPass && <AddNewPassword platform={platform} member={member?._id} toggleAddPass={toggleAddPass} />
        }
      <section className="pass-inner-container">
        <h2 >Your {platform} Passwords:</h2>
        <div className="check">
          <Link to='/passwords'>&#8598; Back to Dashboard</Link>
          {
            toShowPass?.length > 0 && <div>
              <input id='check' onChange={()=>changePassState()} type="checkbox" />
              <label htmlFor="check">Show Password: </label>
            </div>
          }
        </div>
        <div className="show-pass">
          {
            toShowPass?.length > 0 ? <>
              <table>
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Password</th>
                    <th>Email:</th>
                    <th>Phone</th>
                    <th>Username</th>
                    <th>Security Key</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    toShowPass?.map((password,i)=> <ShowPasswords key={i} password={password} showPassword={showPassword} i={i} />)
                  }
                </tbody>
              </table>
            </>:<>
                  <h3>You did not add a password.</h3>
            </>
          }
        </div>
        
        <div className="add-pass-btn">
          <button onClick={()=>toggleAddPass(true)}>Add New Password</button>
        </div>
      </section>
    </article>
  );
};

export default AccountPasswords;