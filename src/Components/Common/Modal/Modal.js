import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../../../Styles/Modal/Modal.scss'

const Modal = () => {
  const [isShow, setShow] = useState();
  useEffect(()=>{
    const isModal = sessionStorage.getItem("isShow");
    if(!isModal){
      sessionStorage.setItem('isShow', true);
    }
    setShow(isModal);
  },[])
  const maintainModal = (vl) => {
    sessionStorage.setItem('isShow', vl);
    setShow(vl)
  }
  console.log(isShow);
  if(isShow === 'true'){
    return (
      <div className='modal-body'>
        <button onClick={()=>maintainModal(false)}>Close</button>
        <img src="https://i.postimg.cc/L8VgBbzK/welcome.png" alt="welcome" />
      </div>
    );
  }
};

export default Modal;