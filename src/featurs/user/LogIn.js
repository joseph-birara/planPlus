import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import {EmailForCode,ResetNewPassword,Login} from './UserActions';
import { Link, useNavigate,} from 'react-router-dom';

function LogIn() {
  const userref = useRef();
  const errorref = useRef();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const dispatch = useDispatch();
  const { success } = useSelector(selectCurrentUsers);
  const navigate = useNavigate();
  const handleSubmit =(e)=>{
        e.preventDefault();
        
       if(password && confirmPassword ){
           dispatch(Login({ password }))
           navigate('/')
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
          <h3 className='mt-10 text-1xl'>
              Log in to continue
          </h3>
         
          <form className="m-2 flex flex-col gap-4 text-center items-center">
        
          
                  <input
                 ref = {userref}
                  required
                  value={password}
                 onChange={e => setpassword(e.target.value)}
                  type="password"
                  name="email"
                  id="email"
                  placeholder="New password "
                      className="w-60 px-3 py-2 bg-[#F9F2ED]"
        />
         <input
                
                  required
                  value={confirmPassword}
                 onChange={e => setconfirmPassword(e.target.value)}
                  type="password"
                  name="email"
                  id="email"
                  placeholder="confirm password "
                      className="w-60 px-3 py-2 bg-[#F9F2ED]"
        />
        <p> Forget password? <span className='text-[#3AB0FF]'><Link to ='/register'>Reset</Link></span></p>
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!password || !confirmPassword}
                 onClick={handleSubmit}
                  type="button" className=" m-4 w-40 h-10 text-white bg-[#3AB0FF] rounded-md text-center">
                  Log in</button>
        
             
      </form>
      <p> New to TooDoo? <span className='text-[#3AB0FF]'><Link to ='/register'>Register</Link></span></p>
      </div>
  )
}

export default LogIn