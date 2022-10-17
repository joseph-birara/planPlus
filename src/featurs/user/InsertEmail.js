import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import {EmailForCode} from './UserActions';
import { Link, useNavigate} from 'react-router-dom';
import validEmail from '../../GlobalVariabls/EmailValidation';
import LeftArraw from '../../Assets/IconCollection/LeftArraw';



function InsertEmail() {
      const [error, setError] = useState(null);
    const userref = useRef();
    const errorref = useRef();
    const [email, setEmail] = useState();
    const dispatch = useDispatch();
    const { success } = useSelector(selectCurrentUsers);
    const navigate = useNavigate();

    const validateEmail = (email) => {
    const re = validEmail
    return re.test(String(email).toLowerCase());
  };
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
        <div>
            <div className='bg-[#F9F2ED] flex justify-between w-full h-10'>
        <div className='ml-6 mt-2 '>
          
    <Link to='/login'><LeftArraw />
    </Link>
        </div> 
       
        
    </div>
      <div className='flex flex-col m-16 items-center gap-2'>
          
          <img  src={TooDoo_logo} alt='logo' className='mt-14 h-14' />
          <h1 className='text-center text-3xl font-black mt-7'>
              TooDoo
          </h1>
          <h3 className='mt-10 text-lg font-semibold'>
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
                  type="button" className="btn mt-8 font-bold">
                  Send code</button>
        
             
              </form>
            </div>
            </div>
     
  )
}

export default InsertEmail