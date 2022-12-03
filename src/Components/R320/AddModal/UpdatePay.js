import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useData from '../../../hooks/useData/UseData';
import "../../../Styles/R320/R320.scss"

const UpdatePay = () => {
  const {register, handleSubmit, reset, setValue} = useForm();
  const {id} = useParams();
  const {setObserveAddNewPay} = useData();
  const [r320Members, setR320Member] = useState(null);
  const [pay, setPay] = useState(null);
  const navigate = useNavigate();
  useEffect(()=> {
    fetch(`https://time-line-server-ashikfree999.vercel.app/r320-pay/${id}`)
    .then(res=>res.json())
    .then(result=> setPay(result || []))
  }, [id]);

  // update action
  const updatePay = data => {
    const options = {
      method: "PUT",
      headers : {
        'Accept' : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(data)
    }
    fetch(`https://time-line-server-ashikfree999.vercel.app/r320-pay/${id}`, options)
    .then(res => {
      if(res.status=== 200){
        setObserveAddNewPay(true);
        reset();
        navigate('/320');
      };
    })
  }
    // load members r320
    useEffect(()=>{
      fetch("https://time-line-server-ashikfree999.vercel.app/r320-members")
      .then(res=>res.json())
      .then(result => setR320Member(result))
    },[id]);

  // set the previous value
  setValue('name',pay?.name)
  setValue('date',pay?.date)
  setValue('amount',pay?.amount)
  return (
    <article className='r320'>
      <section className="r320-container">
        <div className="edit-content">
          <h3>Edit {pay?.name}'s Payment:</h3>
          <form className='r320-modal-form' onSubmit={handleSubmit(updatePay)}>
            <div className="form-field">
              <span>Name:</span>
              <select {...register('name')}>
                <option value="">Select Member</option>
                {r320Members?.map((m, i)=> <option key={i} value={m?.name}>{m?.name}</option>)}
              </select>
            </div>
            <div className="form-field">
              <span>Date:</span>
              <input type="date" {...register('date')} />
            </div>
            <div className="form-field">
              <span>Amount:</span>
              <input type="text" inputMode='number' {...register('amount')} />
            </div>
            <div className="edit-btn">
              <span className='add-btn' onClick={()=>navigate('/320')}>Back</span>
              <button  className='add-btn'>Update</button>
            </div>
          </form>
        </div>
      </section>
    </article>
  );
};

export default UpdatePay;