import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useData from '../../../hooks/useData/UseData';

const UpdateCost = () => {
  const {register, handleSubmit, reset, setValue} = useForm();
  const {id} = useParams();
  const {setObserveAddNewCost} = useData();
  const [cost, setCost] = useState(null);
  const navigate = useNavigate();
  useEffect(()=> {
    fetch(`https://time-line-server.vercel.app/r320-cost/${id}`)
    .then(res=>res.json())
    .then(result=> setCost(result || []))
  }, [id]);

  console.log(id);
  // update action
  const updateCost = data => {
    const options = {
      method: "PUT",
      headers : {
        'Accept' : "application/json",
        'Content-Type' : "application/json"
      },
      body : JSON.stringify(data)
    }
    fetch(`https://time-line-server.vercel.app/r320-cost/${id}`, options)
    .then(res => {
      if(res.status=== 200){
        setObserveAddNewCost(true);
        reset();
        navigate('/320');
      };
    })
  }

    // set the previous value
    setValue('name',cost?.name)
    setValue('date',cost?.date)
    setValue('amount',cost?.amount)

  return (
    <article className='r320'>
      <section className="r320-container">
        <div className="edit-content">
          <h3>Edit {cost?.date} Cost:</h3>
          <form className='r320-modal-form' onSubmit={handleSubmit(updateCost)}>
            <div className="form-field">
              <span>Name:</span>
              
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

export default UpdateCost;