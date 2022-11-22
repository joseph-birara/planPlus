import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers,emailRejectedReset} from './userSlice';
import {EmailForCode} from './UserActions';
import { Link, useNavigate} from 'react-router-dom';
import validEmail from '../../GlobalVariabls/EmailValidation';
import LeftArraw from '../../Assets/IconCollection/LeftArraw';
import { unwrapResult } from '@reduxjs/toolkit';
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner';
import { selectCurrentTasks } from '../tasks/TaskSlice';
import translate from '../../Assets/translationLanguga';



function InsertEmail() {
    const [error, setError] = useState(null);
    const userref = useRef();
    const {languageChange }=useSelector(selectCurrentTasks)
    
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { emailRejected ,loading} = useSelector(selectCurrentUsers);
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
   if (loading) {
  return <LoadingSpiner/>
}
    return (
        <div>
            <div className='bg-[#F9F2ED] flex justify-between w-full h-11'>
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
             {languageChange ? translate.forget.eng : translate.forget.tg}
          </h3>
          <p className='m-3 w-60 text-center'>
              {languageChange ? translate.resetCode.eng:translate.resetCode.tg}
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
                   placeholder={languageChange?translate.email.eng:translate.email.tg}
                 className="inputBox w-60"
                  />
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!email ||!validateEmail(email) }
                 onClick={handleSubmit}
                  type="button" className="btn mt-8 font-bold text-xl">
                        {languageChange ? translate.sendCode.eng:translate.sendCode.tg }</button>
        
             
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