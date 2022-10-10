
import PinInput from 'react-pin-input';
import React, { useState ,useEffect,useRef} from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'


import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import { EmailForCode } from './UserActions';
import ProgressBar from './progressBar';




function EnterCode() {
  const [optCode, setoptCode] = useState('')
  const handleSubmit = (e) => {
    // e.preventDefault();
    if(optCode.length === 4){console.log(optCode)}
    
  }
  let wid = 25
  return (

    <div className='flex flex-1 flex-col  w-2/3 gap-1 justify-center m-12 text-center inset-40 items-center'>
      <div>
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

 <ProgressBar progressPercentage={wid}/>
      </div>
      <div>
        <button
        disabled={optCode.length !== 4}
        onSubmit ={handleSubmit}
                  // onClick={this.onSubmitSignin}
                  
                //   disabled = {!this.state.password ||!this.state.email }
                //   onClick={this.handleSubmit}
        type="button"
        className="w-25 h-15 px-3 py-4 text-white bg-[#3AB0FF] rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out"
      >
                  Send code</button>
      </div> 
        
    </div>
  )
}

export default EnterCode