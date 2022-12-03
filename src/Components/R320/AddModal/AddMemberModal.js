import React from 'react';
import { useForm } from 'react-hook-form';

const AddMemberModal = ({setShowMemberModal, setObserveAddNewMember}) => {
  const {register, handleSubmit, reset}= useForm();
  const postNewMember = data => {
    const options = {
      method: "POST",
      headers : {
        'Accept' : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(data)
    }
    fetch('https://time-line-server-ashikfree999.vercel.app/r320-member', options)
    .then(res=>{
      if(res.status === 200){
        setObserveAddNewMember(true);
        setShowMemberModal(false);
        reset();
      }
    })
  }
  return (
    <div className='r320-modal'>
      <div className="r320-inner-modal">
        <div className="modal-btn">
            <button className='add-btn' onClick={()=>setShowMemberModal(false)}>Cancle</button>
        </div>
        <h4>Add New Member:</h4>
        <form onSubmit={handleSubmit(postNewMember)} className="r320-modal-form">
          <div className="form-field">
            <span>Enter Member Name:</span>
            <input {...register('name', {required:true})} type="text" placeholder='Enter Name' />
          </div>
          <div className="form-field">
            <span>Enter Room Number:</span>
            <input {...register('roomno', {required:true})} type="text" inputMode='number' placeholder='Room No.' />
          </div>
          <div className="form-field modal-btn">
            <button className="add-btn">+ Add New Member</button>
          </div>
        </form>
      </div>      
    </div>
  );
};

export default AddMemberModal;