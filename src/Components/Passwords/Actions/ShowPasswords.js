
const ShowPasswords = ({password, i, showPassword, deleteSinglePass, setMsg, msg}) => {
  const resetMsg = () => {
    setTimeout(()=>setMsg(""), 1000);
  }
  const copyNow = event => {
    event.target.select();
    const isCopy = document.execCommand("copy");
    
    if(isCopy) {
      setMsg("Copied!");
      resetMsg();
    }
    else{
      setMsg("")
    }
  };

  return (
    <>
        
      <tr>
        <td>{(i +1)}</td>
        <td>
          <input type={showPassword ? 'text' :"password"} readOnly title="Copy" value={password?.password} onClick={(e)=> copyNow(e)}  />
        </td>
        <td><input type="text" value={password?.email || 'N/A'}  title="Copy" readOnly onClick={(e)=> copyNow(e)} /></td>
        <td><input type="text" value={password?.phone || 'N/A'} readOnly onClick={(e)=> copyNow(e)} /></td>
        <td><input type="text" value={password?.userName || 'N/A'} readOnly onClick={(e)=> copyNow(e)} /></td>
        <td><input type="text" value={password?.ip || 'N/A'} readOnly onClick={(e)=> copyNow(e)} /></td>
        <td><input type="text" value={password?.securityKey || 'N/A'} readOnly onClick={(e)=> copyNow(e)} /></td>
        <td><span onClick={()=>deleteSinglePass(password?._id)} className='delete-password'>del</span></td>
        <td>{password?.note || 'N/A'}</td>
      </tr>
    </>
  );
};

export default ShowPasswords;