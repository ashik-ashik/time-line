import React from 'react';

const ShowPasswords = ({password, i, showPassword}) => {
  return (
    <tr>
      <td>{(i +1)}</td>
      <td><input type={showPassword ? 'text' :"password"} readOnly value={password?.password} /></td>
      <td>{password?.email || 'N/A'}</td>
      <td>{password?.phone || 'N/A'}</td>
      <td>{password?.userName || 'N/A'}</td>
      <td>{password?.securityKey || 'N/A'}</td>
      <td>Comming...</td>
    </tr>
  );
};

export default ShowPasswords;