import React from 'react';
import { useForm } from 'react-hook-form';

const AddPayModal = ({setShowPayModal, setObserveAddNewPay}) => {
  const {register, handleSubmit, reset} = useForm();
  const postNewPay = data => {
    const options = {
      method: "POST",
      headers : {
        'Accept' : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(data)
    }
    fetch('https://radiant-refuge-40674.herokuapp.com/r320-pay', options)
    .then(res => {
      if(res.status === 200){
        setObserveAddNewPay(true);
        setShowPayModal(false);
        reset();
      }
    })
  }
  return (
    <div className='r320-modal'>
      <div className="r320-inner-modal">
        <div className="modal-btn">
          <button className='add-btn' onClick={()=>setShowPayModal(false)}>Cancle</button>
        </div>
        <h4>Add New Pay:</h4>

        <form onSubmit={handleSubmit(postNewPay)} className="r320-modal-form">
          <div className="form-field">
            <span>Enter Name:</span>
            <input {...register('name', {required:true})} type="text" placeholder='Enter Name' />
          </div>
          <div className="form-field">
            <span>Enter date:</span>
            <input {...register('date', {required:true})} type="date" />
          </div>
          <div className="form-field">
            <span>Enter Amount:</span>
            <input {...register('amount', {required:true})} type="text" placeholder='Enter Amount' inputMode='number' />
          </div>
          <div className="form-field modal-btn">
            <button className='add-btn'>Add New Pay</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddPayModal;