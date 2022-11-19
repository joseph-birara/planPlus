import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import {Login} from './UserActions';
import { Link, useNavigate, } from 'react-router-dom';

import Icons from '../../Assets/IconCollection/Icons';
import IconsVisiblel from '../../Assets/IconCollection/IconsVisiblel';
import validEmail from '../../GlobalVariabls/EmailValidation';
import { unwrapResult } from '@reduxjs/toolkit'
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner';
import { selectCurrentTasks } from '../tasks/TaskSlice';
import translate from '../../Assets/translationLanguga';



function LogIn() {
  const userref = useRef();
  
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const dispatch = useDispatch();
  const { loading, RequestMessageForLogIn } = useSelector(selectCurrentUsers);
  const {languageChange} = useSelector(selectCurrentTasks)
  const [error, setError] = useState('');
  // if (RequestMessageForLogIn) {
  //   setError(RequestMessageForLogIn)
  // }

  
  const navigate = useNavigate();
  const [showAndHide, setshowAndHide] = useState(false);
  const validateEmail = (email) => {
    const re =validEmail
    return re.test(String(email).toLowerCase());
  };
  const resultForLognIN = async () => {
    const resultAction = await dispatch(Login({ password, email }))
    const promiseResult = unwrapResult(resultAction)
    if (promiseResult.data.email === email) {
      navigate('/')
    }
    else {
      setError('log in failed try again')
    }

     console.log(promiseResult.data.email)
 }
  const handleSubmit =(e)=>{
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid Email');
    }
    if (password.length < 8) {
      setError('Password must be at least 8 chars long');
    }
    if (!error) {
      
     
      if (password && email) {
        
        resultForLognIN()
      }
    }
        
    }
    

    useEffect(() => {
         userref.current.focus();
    }, []) 
  useEffect(() => {
    if (RequestMessageForLogIn) {
      setError(RequestMessageForLogIn)
    }
  },[RequestMessageForLogIn])
  
  return (
    <div className='flex flex-col m-12 items-center gap-1 mt-20'>
      {
        loading?<div className='mt-10 z-50'><LoadingSpiner/></div>:''
      }
      
          <img  src={TooDoo_logo} alt='logo' className='m-8 h-12' />
          <h1 className='text-center text-3xl font-black'>
              TooDoo
          </h1>
          <h3 className='mt-14 text-2xl  font-semibold'>
             {languageChange?translate.logTocontinue.eng:translate.logTocontinue.tg}
      </h3>
      {
        error ? <div className='errorMessag'>
         { error}
        </div> :
          ''
      }
         
          <form className="m-2 mt-8 flex flex-col gap-3 text-center items-center">
        
          
                  <input
                 ref = {userref}
                  required
                  value={email}
                 onChange={e => setemail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email "
          className="inputBox"
          onClick={(e) =>setError('')}
        />
         <div className='relative'> 
          <input
                
                  required
                  value={password}
                 onChange={e => setpassword(e.target.value)}
                  type={showAndHide ===false? "password":"text"}
                  name="password"
                  id="password"
                  placeholder=" Password "
            className="inputBox"
            onClick={(e) =>setError('')}
            
          />
          <div onClick={() => 
            setshowAndHide(!showAndHide)
            
          }>
{ showAndHide ?<IconsVisiblel/>:<Icons />}
          </div>
          
          
          </div>
        <p className='text-right ml-24 justify-end text-sm lg:ml-36'>{languageChange ? translate.forget.eng : translate.forget.tg} <span className='text-[#3AB0FF]'><Link to='/insertemail'>{languageChange?translate.reset.eng:translate.reset.tg }</Link></span></p>
        <button
          
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!email || password.length<8}
                 onClick={handleSubmit}
                  type="button" className=" btn mt-10">
          {languageChange?translate.login.eng:translate.login.tg }</button>
        
             
      </form>
      <p className='text-sm -mt-2'> {languageChange ? translate.new.eng : translate.new.tg} <span className='text-[#3AB0FF]'><Link to='/register'>{languageChange?translate.register.eng:translate.register.tg }</Link></span></p>
       {
        loading?<div className='mt-10 z-50'><LoadingSpiner/></div>:''
      }
      </div>
  )
}

export default LogIn