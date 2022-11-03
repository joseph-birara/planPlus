import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers,emailRejectedReset} from './userSlice';
import {EmailForCode} from './UserActions';
import { Link, useNavigate} from 'react-router-dom';
import validEmail from '../../GlobalVariabls/EmailValidation';
import LeftArraw from '../../Assets/IconCollection/LeftArraw';
import { unwrapResult } from '@reduxjs/toolkit';



function InsertEmail() {
    const [error, setError] = useState(null);
    const userref = useRef();
    const errorref = useRef();
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { emailRejected } = useSelector(selectCurrentUsers);
    const navigate = useNavigate();

    const validateEmail = (email) => {
    const re = validEmail
    return re.test(String(email).toLowerCase());
    };
    const resultForRecovery = async () => {
    const resultAction = await dispatch(EmailForCode({email}))
        const promiseResult = unwrapResult(resultAction)
        console.log("inside insert email",promiseResult.data.email);
    if (promiseResult.data.email ===email ) {
      navigate('/entercode')
    }
    else {
      setError('invalid email')
    }

     
 }
    const handleSubmit =(e)=>{
        e.preventDefault();
        
       if(email ){
           resultForRecovery()
           
       }
        
    }
    

    useEffect(() => {
        userref.current.focus();
    }, [])  
    //error reset
    const resetor = () => {
        setError('')
      dispatch(emailRejectedReset()) 
    }
   
    return (
        <div>
            <div className='bg-[#F9F2ED] flex justify-between w-full h-10'>
        <div className='ml-6 mt-2 '>
          
    <Link to='/login'><LeftArraw />
    </Link>
        </div> 
       
        
    </div>
      <div className='flex flex-col m-16 items-center gap-2'>
          
          <img  src={TooDoo_logo} alt='logo' className='mt-20 h-14' />
          <h1 className='text-center text-3xl font-black mt-5'>
              TooDoo
          </h1>
          <h3 className='mt-12 text-xl font-semibold'>
              Forgot password?
          </h3>
          <p className='m-3 w-60 text-center'>
              A password reset code will be sent to your email.
          </p>
          <form className="m-1 flex flex-col gap-4 text-center items-center">
        
          
                  <input
                 ref = {userref}
                  required
                        value={email}
                        onClick ={resetor}
                 onChange={e => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email "
                 className="inputBox w-60"
                  />
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!email }
                 onClick={handleSubmit}
                  type="button" className="btn mt-8 font-bold text-xl">
                  Send code</button>
        
             
                </form>
                {
                    error ? <div className='errorMessag'>{ error}</div>:''
                }
                 {
                    emailRejected ? <div className='errorMessag'>{ emailRejected}</div>:''
                }
            </div>

            </div>
     
  )
}

export default InsertEmail