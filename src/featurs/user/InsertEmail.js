import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import {EmailForCode} from './UserActions';
import { Link, useNavigate,} from 'react-router-dom';


function InsertEmail() {
    const userref = useRef();
    const errorref = useRef();
    const [email, setEmail] = useState();
    const dispatch = useDispatch();
    const { success } = useSelector(selectCurrentUsers);
    const navigate = useNavigate();
    const handleSubmit =(e)=>{
        e.preventDefault();
        
       if(email ){
           dispatch(EmailForCode({ email }))
           navigate('/entercode')
       }
        
    }
    

    useEffect(() => {
        userref.current.focus();
    }, [])    
   
  return (
      <div className='flex flex-col m-12 items-center gap-2'>
          <img  src={TooDoo_logo} alt='logo' className='m-10 h-15 w-1/6' />
          <h1 className='text-center text-4xl'>
              TooDoo
          </h1>
          <h3 className='mt-10 text-2xl'>
              Forgot password?
          </h3>
          <p className='m-3 w-60'>
              A password reset code will be sent to your email.
          </p>
          <form className="m-1 flex flex-col gap-4 text-center items-center">
        
          
                  <input
                 ref = {userref}
                  required
                  value={email}
                 onChange={e => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email "
                      className="w-60 px-3 py-2 bg-[#F9F2ED]"
                  />
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!email }
                 onClick={handleSubmit}
                  type="button" className="w-40 h-10 text-white bg-[#3AB0FF] rounded-md text-center">
                  Send code</button>
        
             
              </form>
      </div>
     
  )
}

export default InsertEmail