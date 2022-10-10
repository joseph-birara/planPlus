import React, { useState } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useEffect,useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import {EmailForCode} from './UserActions';


function InsertEmail() {
    const userref = useRef();
    const errorref = useRef();
    const [email, setEmail] = useState();
    const dispatch = useDispatch();
    const { success } = useSelector(selectCurrentUsers);
    const handleSubmit =(e)=>{
        e.preventDefault();
        
       if(email ){
        dispatch(EmailForCode({email}))
       }
        
    }
    

    useEffect(() => {
        userref.current.focus();
    }, [])    
   
  return (
      <div className='flex flex-col m-12 '>
          <img  src={TooDoo_logo} alt='logo' className='mr-1/3 h-1/3 w-1/3' />
          <h1 className='text-center'>
              TooDoo
          </h1>
          <h3 className='mr-5 mt-10'>
              Forgot password?
          </h3>
          <p className='m-5'>
              A password reset code will be sent to your email.
          </p>
          <form className="mb-4 flex flex-col gap-4">
        
          
                  <input
                 ref = {userref}
                  required
                  value={email}
                 onChange={e => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email "
                      className="w-1/3 px-3 py-2 bg-[#F9F2ED] placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                <button
                  // onClick={this.onSubmitSignin}
                  
                //   disabled = {!this.state.password ||!this.state.email }
                //   onClick={this.handleSubmit}
                  type="button" className="w-1/5 px-3 py-4 text-white bg-[#3AB0FF] rounded-md hover:bg-indigo-600 focus:outline-none duration-100 ease-in-out">
                  Send code</button>
        
             
              </form>
      </div>
     
  )
}

export default InsertEmail