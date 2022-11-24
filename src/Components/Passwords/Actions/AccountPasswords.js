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
  const {member, passwords, setReloadPass}=useData();
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
  };

  // 
  // 
  // delete single password
  const deleteSinglePass = id => {
    fetch(`https://radiant-refuge-40674.herokuapp.com/delete-password/${id}`, {method:"DELETE"})
    .then(res=>{
      if(res.status){
        setReloadPass(true);
      }
    })
  };
  // delete all password form the platform
  const deleteAllPassword = () => {
    fetch(`https://radiant-refuge-40674.herokuapp.com/delete-passwords/${platform}`, {method:"DELETE"})
    .then(res => {
      if(res.status === 200){
        setReloadPass(true);
      }
    })
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
                    toShowPass?.map((password,i)=> <ShowPasswords key={i} password={password} deleteSinglePass={deleteSinglePass} showPassword={showPassword} i={i} />)
                  }
                  {toShowPass?.length > 1 &&<tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><span onClick={deleteAllPassword} className='delete-password'>Delete All</span></td>
                  </tr>}
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