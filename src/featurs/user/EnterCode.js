
import PinInput from 'react-pin-input';
import React, {useCallback, useState ,useEffect,useRef} from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import LeftArraw from '../../Assets/IconCollection/LeftArraw';


import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import { SendCode } from './UserActions';
import { EmailForCode } from './UserActions';
import ProgressBar from './progressBar';
import { Link } from 'react-router-dom';




function EnterCode() {
  const [optCode, setoptCode] = useState('')
  const userref = useRef();
  const [timer, setTimer] = useState(10); 
  const dispatch = useDispatch()
  const { emailForReset } = useSelector(selectCurrentUsers);
  
  const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);
useEffect(() => {
        userref.current.focus();
    }, []) 

useEffect(() => {
  timer > 0 && setTimeout(timeOutCallback, 1000);
}, [timer, timeOutCallback]);

  console.log(timer);
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(SendCode(optCode))
  }

const resetTimer = function () {
  if (!timer) {
    setTimer(60);
    dispatch(EmailForCode({ emailForReset }))
    
    
   
  }
};
  

   
  let wid = 0
  return (
    <div>

      <div className='bg-[#F9F2ED] flex justify-between w-full h-12'>
        <div className='ml-8 mt-2 '>
          
    <Link to='/insertemail'><LeftArraw />
    </Link>
        </div> 
        {
          emailForReset
        }
        
    </div>

    <div className='flex flex-col mt-60 items-center gap-4'>
      <div className='text-bold text-2xl '>
        Enter code below

      </div>
      
      <div>
          <PinInput 
            ref ={userref}
  length={4} 
  initialValue=""
  
        onChange={(value, index) => {
          // console.log(optCode)
          
          
  }} 
  type="numeric" 
  inputMode="number"
  style={{padding: '10px',}}  
  inputStyle={{ borderColor: 'black', borderRadius: '10px',background:'#F9F2ED' }}
  inputFocusStyle={{borderColor: 'blue'}}
          
          onComplete={(value, index) => {
    setoptCode( value)
  }}
  autoSelect={true}
  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      </div> 
      <div className='text-center right-6 '>

 <ProgressBar progressPercentage={ (100/60) * (60 - timer) }/>
      </div>
      <div className=' right-0 mr-0'>
          {timer > wid ? <span className='ml-40'>{`${timer} secs`}</span>  : <span>Didnt get code? <span className='text-blue-500 hover:cursor-pointer' onClick={resetTimer}> Resend  </span> <span className='ml-5'>0 secs</span>  </span>}
         
      </div>
      <div>
        <button
        disabled={optCode.length !== 4}
        onSubmit ={handleSubmit}
                  // onClick={this.onSubmitSignin}
                  
                //hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out   disabled = {!this.state.password ||!this.state.email }
                //   onClick={this.handleSubmit}
        type="button"
        className="btn "
      > Send code</button>
      </div> 
        
      </div>
      </div>
  )
}

export default EnterCode