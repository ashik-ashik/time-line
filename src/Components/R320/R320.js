import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useData from '../../hooks/useData/UseData';
import "../../Styles/R320/R320.scss"
import Loader from '../Common/Loader/Loader';
import AddMemberModal from './AddModal/AddMemberModal';
import AddPayModal from './AddModal/AddPayModal';
import CostModal from './AddModal/CostModal';

const R320 = () => {
  const {observeAddNewCost, setObserveAddNewCost, setObserveAddNewPay, observeAddNewPay} = useData();
  // costs variables
  const [isShowCostModal, setShowCostModal] = useState(false);
  const [costs, setCosts] = useState(null);
  
  // pays variables
  const [isShowPatModal, setShowPayModal] = useState(false);
  const [pays, setPays] = useState(null);
  
  // member variables
  const [isShowMemberModal, setShowMemberModal] = useState(false);
  const [r320Members, setR320Member] = useState(null);
  const [observeAddNewMember, setObserveAddNewMember] = useState(false);


  // load costs
  useEffect(()=>{
    fetch('https://radiant-refuge-40674.herokuapp.com/r320-costs')
    .then(res=>res.json())
    .then(result => setCosts(result || []))
  },[observeAddNewCost]);

  // load pays
  useEffect(()=>{
    fetch('https://radiant-refuge-40674.herokuapp.com/r320-pays')
    .then(res=>res.json())
    .then(result => setPays(result || []))
  },[observeAddNewPay]);

  // load members r320
  useEffect(()=>{
    fetch("https://radiant-refuge-40674.herokuapp.com/r320-members")
    .then(res=>res.json())
    .then(result => setR320Member(result))
  },[observeAddNewMember]);

  // find the current month's data
  const monthNames = ["January","February", "March", "April", 'May', "June", "July","August","September","October","November","December"]
  const presentYear = new Date().getFullYear();
  const presentMonth = new Date().getMonth();
  const currentMonth = presentYear+'-'+ (presentMonth + 1);
  const currentCosts = costs?.filter(cost => cost.date?.startsWith(currentMonth));
  const currentPays = pays?.filter(cost => cost.date?.startsWith(currentMonth));

  // calculate total amount
  const sumTotal = (tt, i)=>{
    return tt + parseInt(i.amount)
  }
  const totalCosts = currentCosts?.reduce(sumTotal, 0);
  const totalPay = currentPays?.reduce(sumTotal, 0);

  // filter pays by member name
  const {register, handleSubmit, reset} = useForm();
  const filterPays = (data) => {
    const filterPay = pays?.filter(cost => cost.name?.toLowerCase()?.includes((data.name).toLowerCase()));
    setPays(filterPay);
    reset();
    console.log(filterPay, currentPays);
  }

  // reset Filter
  const resetFilter = (data) => {
    if(data === 'pay'){
      setObserveAddNewPay(true)
    }else{
      setObserveAddNewCost(true);
    }
  }

  if(!costs || !pays || !r320Members){
    return <Loader />
  }


  return (
    <>
      {
        isShowCostModal && <CostModal setShowCostModal={setShowCostModal} setObserveAddNewCost={setObserveAddNewCost} />
      }
      {
        isShowPatModal && <AddPayModal r320Member={r320Members} setObserveAddNewPay={setObserveAddNewPay} setShowPayModal={setShowPayModal} />
      }
      {
        isShowMemberModal && <AddMemberModal setShowMemberModal={setShowMemberModal} setObserveAddNewMember={setObserveAddNewMember} />
      }
      <article className='r320'>
        <section className="r320-container">
          <div className="r320-grid">
            {/* show members */}
            <div className="r320-members">
              <div className='members'>
                {
                r320Members?.map((mem, i) => <span key={i}>{mem?.name}<br /><small> {mem?.roomno}</small></span>)
                }
                <div className="add-member-btn">
                  <button onClick={()=>setShowMemberModal(true)}>Add New Member</button>
                </div>
              </div>
              <div className="calculation">
                <div><span>Total Pay:</span> <span>{totalPay}</span></div>
                <div><span>Total Costs:</span> <span>{totalCosts}</span></div>
                <hr />
                <div>
                  <span>{totalPay >= totalCosts ? "Remaining" : "Due" }</span>
                  <span>{totalPay - totalCosts}</span>
                  </div>
              </div>
              <div className="personal-calculation">
                <div><span></span></div>
              </div>
            </div>

            {/* show accounts */}
            <div className="r320-content">
              <div className="r320-costs content">
                {/* costs filter and add costs */}
                  <div className="r320-action">
                    <form >
                      <input type="date" />
                      <button className='add-btn' type='submit'>Filter</button>
                      <span onClick={()=>resetFilter('cost')} className='r320-reset'>&#8634;</span>
                    </form>
                    <button onClick={()=>setShowCostModal(true)} className='add-btn'>+ A costs</button>
                  </div>
                  {/* cost table title */}
                  <div className="table-title">
                    <h4>Costs: {monthNames[presentMonth]}, {presentYear}</h4>
                  </div>
                <div className="cost-table">
                  <table>
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                     currentCosts?.map((cost, i)=><tr key={i}>
                        <td>{i+1}</td>
                        <td>{cost?.date}</td>
                        <td>{cost?.amount}</td>
                        <td><Link to={`/cost-edit/${cost?._id}`} className="edit-btn">Edit</Link></td>
                      </tr>) 
                    }
                      {currentCosts?.length <=0 && <tr>
                          <td colSpan={4}>No data found.</td>
                      </tr>}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="r320-pay content">
                <div className="r320-action">
                    <form onSubmit={handleSubmit(filterPays)}>
                      <input {...register('name')} type="text" placeholder='Enter Name' />
                      <button className='add-btn' type='submit'>Filter</button>
                      <span onClick={()=>resetFilter('pay')} className='r320-reset'>&#8634;</span>
                    </form >
                    <button  onClick={()=>setShowPayModal(true)} className='add-btn'>+ A Pay</button>
                  </div>
                <div className="table-title">
                  <h4>Pays: {monthNames[presentMonth]}, {presentYear}</h4>
                </div>
                <div className="pay-table">
                  <table>
                    <thead>
                      <tr>
                        <th>SL:</th>
                        <th>Name:</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        currentPays?.length >=0 ? currentPays.map((pay,i)=><tr key={i}>
                          <td>{i+1}</td>
                          <td>{pay?.name}</td>
                          <td>{pay?.date}</td>
                          <td>{pay?.amount}</td>
                          <td><Link to={`/pay-edit/${pay?._id}`} className="edit-btn">Edit</Link></td>
                        </tr>) : <tr>
                          <td colSpan={5}>OOPS! No Date Found.</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default R320;