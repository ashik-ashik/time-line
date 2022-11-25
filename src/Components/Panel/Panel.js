import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useData from '../../hooks/useData/UseData';
import "../../Styles/Panel/Panel.scss"
import Loader from '../Common/Loader/Loader';

const Panel = () => {
  const [reloadMembers, setReloadMembers] = useState(false);
  const {member, user} = useData();
  
  const [members, setMembers] = useState(null);
  useEffect(()=>{
    fetch(`https://radiant-refuge-40674.herokuapp.com/members`)
      .then(res=>res.json())
      .then(result=> setMembers(result || []));
      setReloadMembers(false);
  },[reloadMembers, user?.user]);

  // update member
  const updateMemberRole = id => {
    const role = document.getElementById(id).value;
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({role})
    }
    fetch(`https://radiant-refuge-40674.herokuapp.com/update-role/${id}`, options)
    .then(res=>{
      if(res.status === 200){
        setReloadMembers(true)
      };
    })
  }
  if(!members){
    return <Loader />
  }
  return (
    <article>
      <section className="container">
        {/* <div className="my-profile">
          <img src={member?.photoURL} alt="profile" />
        </div> */}
          <h4 style={{color:"#222"}}>Members:</h4>
          <div className="panel-members">
            {
              members?.map(mem=> <div className={`single-member-wrapper  ${mem?.email === member?.email && 'me'}`}>
                <div className={`single-member`}>
                  <h5>{mem?.name}<sup>{mem?.role || 'N/A'}</sup> <br /> <span>{mem?.email}</span></h5>
                    <select id={mem?._id}>
                      <option value="">Select</option>
                      <option value="viewer">Viewer</option>
                      <option value="special">Special</option>
                      <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="role-action">
                  <button onClick={()=>updateMemberRole(mem?._id)}>Update</button>
                </div>
              </div>)
            }
          </div>
      </section>
      
    </article>
  );
};

export default Panel;