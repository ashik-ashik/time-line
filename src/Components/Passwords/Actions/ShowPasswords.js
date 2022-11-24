import React from 'react';

const ShowPasswords = ({password, i, showPassword, deleteSinglePass}) => {
  return (
    <tr>
      <td>{(i +1)}</td>
      <td><input type={showPassword ? 'text' :"password"} readOnly value={password?.password} /></td>
      <td>{password?.email || 'N/A'}</td>
      <td>{password?.phone || 'N/A'}</td>
      <td>{password?.userName || 'N/A'}</td>
      <td>{password?.securityKey || 'N/A'}</td>
      <td><span onClick={()=>deleteSinglePass(password?._id)} className='delete-password'>del</span></td>
    </tr>
  );
};

export default ShowPasswords;