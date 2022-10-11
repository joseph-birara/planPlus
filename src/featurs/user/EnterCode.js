
import PinInput from 'react-pin-input';
import React, {useCallback, useState ,useEffect,useRef} from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'


import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import { SendCode } from './UserActions';
import { EmailForCode } from './UserActions';
import ProgressBar from './progressBar';




function EnterCode() {
  const [optCode, setoptCode] = useState('')
  const [timer, setTimer] = useState(10); 
  const dispatch = useDispatch()
  const { email } = useSelector(selectCurrentUsers);
  
const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

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
    dispatch(EmailForCode({ email }))
    setTimer(60);
    
   
  }
};
   
  let wid = 0
  return (

    <div className='flex flex-1 flex-col  w-2/3 gap-2 justify-center m-12 text-center inset-40 items-center mt-60 mr-60'>
      <div className='text-bold '>
        Enter code below

      </div>
      
      <div>
        <PinInput 
  length={4} 
  initialValue=""
  
        onChange={(value, index) => {
          // console.log(optCode)
          
          
  }} 
  type="numeric" 
  inputMode="number"
  style={{padding: '10px'}}  
  inputStyle={{borderColor: 'red'}}
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
      <div>
        {timer > wid ? timer: <span>Didnt get code? <span className='text-blue-500' onClick ={resetTimer}> resend </span></span>}
         scs
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
  )
}

export default EnterCode