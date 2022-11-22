import React from 'react';
import { useForm } from 'react-hook-form';
import "../../../Styles/R320/R320.scss"

const CostModal = ({setShowCostModal, setObserveAddNewCost}) => {

  const {register, handleSubmit, reset} = useForm();
  const postNewCost = data => {
    if(data.date === ''){
      data.date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
    }
    const options = {
      method: "POST",
      headers : {
        'Accept' : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(data)
    }
    fetch('https://radiant-refuge-40674.herokuapp.com/r320-cost', options)
    .then(res => {
      if(res.status === 200){
        reset();
        setObserveAddNewCost(true)
        setShowCostModal(false)
      }
    })
  }
  return (
    <div className='r320-modal'>
      <div className="r320-inner-modal">
        <div className="modal-btn">
          <button className='add-btn' onClick={()=>setShowCostModal(false)}>Cancle</button>
        </div>
        <h4>Add New Cost:</h4>
        <form className="r320-modal-form" onSubmit={handleSubmit(postNewCost)}>
          <div className="form-field">
            <span>Enter Date: <sup>*</sup></span>
            <input {...register('date')} type="date" />
          </div>
          <div className="form-field">
            <span>Enter Amount: <sup>*</sup></span>
            <input {...register('amount', {required:true})} type="text" inputMode='number' placeholder='Enter Amount' />
          </div>
          <div className="form-field">
            <span>Descrip:</span>
            <textarea {...register('description')} placeholder='Write Details...' cols="30" rows="10"></textarea>
            <small>Item name | quantity, and multiple items use comma (,) to saparate them.</small>
          </div>
          <div className="form-field modal-btn">
            <button className='add-btn' type='submit'>+ Add Cost</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CostModal;