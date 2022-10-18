
import PinInput from 'react-pin-input';
import React, {useCallback, useState ,useEffect,useRef} from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import LeftArraw from '../../Assets/IconCollection/LeftArraw';


import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import { SendCode } from './UserActions';
import { EmailForCode } from './UserActions';
import ProgressBar from './progressBar';
import { Link, useNavigate } from 'react-router-dom';
import Timer from './Timer';




function EnterCode() {
  const [optCode, setoptCode] = useState('')
  const userref = useRef();
  const [timer, setTimer] = useState(60); 
  const dispatch = useDispatch()
  const { emailForReset } = useSelector(selectCurrentUsers);
  const navigate = useNavigate();
  const [flag, setfalg]=useState(false)
  
  const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);
useEffect(() => {
        userref.current.focus();
}, [flag]) 
  // useEffect(() => {
  //       userref.current.focus();
  //   }, [])

useEffect(() => {
  timer > 0 && setTimeout(timeOutCallback, 1000);
}, [timer, timeOutCallback]);

  console.log(timer);
  const handleSubmit = (e) => {
    e.preventDefault()
    
    dispatch(SendCode(optCode))
    navigate('/newpassword')
  }

const resetTimer = function () {
  if (!timer) {
    setoptCode('')
    setfalg(!flag)
    setTimer(60);
    dispatch(EmailForCode({ emailForReset }))
    
    
   
  }
};
  

   
  let wid = 0
  return (
    <div>

      <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between'>
        <div className='ml-6 mt-2 '>
          
    <Link to='/insertemail'><LeftArraw />
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
          coding@gmail.com
        </div>
        <div>

        </div>
        
    </div>

    <div className='flex flex-col mt-40 items-center gap-4 text-sm'>
      <div className='text-bold text-2xl font-semibold mb-12 w-72 text-center'>
        Enter code below

      </div>
      
      <div className='w-72 text-center -mb-2'>
          <PinInput 
            ref ={userref}
  length={4} 
  initialValue=""
  
        onChange={(value, index) => {
          // console.log(optCode)
          
          
  }} 
  type="numeric" 
  inputMode="number"
  style={{padding: '1px',}}  
  inputStyle={{borderColor:'#F9F2ED', borderRadius: '10px',background:'#F9F2ED' ,height:'48px',width:'35px',margin:'11px'}}
  inputFocusStyle={{borderColor: '#C9B6A9'}}
          
          onComplete={(value, index) => {
    setoptCode( value)
  }}
  autoSelect={true}
  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      </div> 
      <div className='text-center'>

 <ProgressBar progressPercentage={ (100/60) * (60 - timer) }/>
      </div>
        <div className='text-center'>
          <div className='relative -mt-2'>
            {
            timer > wid ? <Timer timeAndSec={ `${timer}sec`} /> : <span
                className='-mt-5'>
                <span>
Didn't get code?
              <span className='text-start'>

                </span>
            <span
              className='text-[#3AB0FF] hover:cursor-pointer font-bold'
              onClick={resetTimer}> Resend
            </span>
                </span>
              
            <span className='ml-10 -mt-3'>0sec
            </span>
          </span>
          }

          </div>
          
         
      </div>
      <div>
        <button
        disabled={optCode.length !== 4}
        onClick ={handleSubmit}
                  // onClick={this.onSubmitSignin}
                  
                //hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out   disabled = {!this.state.password ||!this.state.email }
                //   onClick={this.handleSubmit}
        type="button"
        className="btn font-bold "
      > Submit</button>
      </div> 
        
      </div>
      </div>
  )
}

export default EnterCode