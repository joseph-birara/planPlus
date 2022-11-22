import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {registerMessageNull, selectCurrentUsers} from './userSlice';
import {RegisterUser} from './UserActions';
import { Link, useNavigate, } from 'react-router-dom';
import Icons from '../../Assets/IconCollection/Icons';
import IconsVisiblel from '../../Assets/IconCollection/IconsVisiblel';
import validEmail from '../../GlobalVariabls/EmailValidation';
import Checkbox from '../../Assets/IconCollection/Checkbox';
import { unwrapResult } from '@reduxjs/toolkit'
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner';
import translate from '../../Assets/translationLanguga';
import { selectCurrentTasks } from '../tasks/TaskSlice';
function Register() {
  const [error, setError] = useState(null);
  const userref = useRef();
  const {languageChange }=useSelector(selectCurrentTasks)
  
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [email, setemail] = useState('');
  const [showAndHide, setshowAndHide] = useState(false);
  const [agrement, setagrement] = useState(false);
  const dispatch = useDispatch();
  const { loading,RequestMessageForRegister,userInfo} = useSelector(selectCurrentUsers);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re =validEmail
      
    return re.test(String(email).toLowerCase());
  };

  const result = async () => {
    const resultAction = await dispatch(RegisterUser({ password, email }))
    const promiseResult = unwrapResult(resultAction)
    if (userInfo === email) {
      navigate('/login')
    }

    
  }
  if (userInfo === email) {
      navigate('/')
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid Email');
    }
    if (password.length < 8) {
      setError('Password must be at least 8 chars long');
    }
    if (password !== confirmPassword) {
      setError('pass word does not match')
    }
    if (!error) {
        
      if (password && email) {
        
                result()  
      }
      
        setError(RequestMessageForRegister)
      }
        
    
  }
  
    

    useEffect(() => {
        // userref.current.focus();
    }, []) 
  useEffect(() => {
    if (RequestMessageForRegister) {
      setError(RequestMessageForRegister)
    }
  }, [RequestMessageForRegister])
  const inputBoxClickHandler = () => {
    setError('')
    dispatch(registerMessageNull())
  }

  return (
    <div className='w-screen overflow-hidden'>

    
    <div className='flex flex-col m-16 mt-8 md:mt-12 lg:mt-16 items-center gap-2'>
          <img  src={TooDoo_logo} alt='logo' className='m-10 h-12' />
          <h1 className='text-center text-3xl font-black'>
              TooDoo
          </h1>
          <h3 className='mt-8 md:mt-10 lg:mt-12 text-xl  font-medium'>
             {languageChange?translate.createAccount.eng:translate.createAccount.tg}
      </h3>
      {
        error ? <div className='errorMessag'>
         { error}
        </div> :
          ''
      }
         
          <form className="m-2 mt-9 flex flex-col gap-3 text-center items-center">
        
          
                  <input
                  ref = {userref}
                  required
                  value={email}
                 onChange={e => setemail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder={languageChange?translate.email.eng:translate.email.tg}
          className="inputBox"
          onClick={() =>inputBoxClickHandler()}
        />
        <div className='relative'> 
          <input
                
                  required
                  value={password}
                 onChange={e => setpassword(e.target.value)}
                  type={showAndHide ===false? "password":"text"}
                  name="password"
                  id="password"
                  placeholder={languageChange?translate.password.eng:translate.password.tg}
            className="inputBox"
            onClick={() =>inputBoxClickHandler()}
            
          />
          <div onClick={() => {
            setshowAndHide(!showAndHide)
            console.log(showAndHide)
          }}>
{ showAndHide ?<IconsVisiblel/>:<Icons />}
          </div>
          
          
          </div>

        <input
                
                  required
                  value={confirmPassword}
                 onChange={e => setconfirmPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder={languageChange?translate.cpassword.eng:translate.cpassword.tg}
          className="inputBox"
          onClick={() =>inputBoxClickHandler()}
                  />
        <div
          className='w-64 lg:w-72 flex mt-1'>
          
          <div onClick={()=>setagrement(!agrement)} className='absolute'>
            {
             agrement? <Checkbox />:''
            }
          </div>
            
          <div
            onClick={()=>setagrement(!agrement)}
            className='w-10 h-6 lg:w-10 rounded bg-[#F9F2ED]'>
            
          </div>
          <div
            className='ml-3 text-xs text-left'>
            {
              languageChange?translate.policyAgreement.by.eng:translate.policyAgreement.by.tg
            } 
            <span
              className='text-[#3AB0FF]'>
              {
              languageChange?translate.policyAgreement.policy.eng:translate.policyAgreement.policy.tg
            } 
              
            </span> {
              languageChange?translate.policyAgreement.and.eng:translate.policyAgreement.and.tg
            }  
            <span
              className='text-[#3AB0FF]'>
               {
              languageChange?translate.policyAgreement.terms.eng:translate.policyAgreement.terms.tg
            } {!languageChange?<span className='text-black'>{translate.policyAgreement.last.tg} </span>:''}
            </span>
          </div>
        </div>
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!email || password.length<8 ||!agrement ||confirmPassword !==password}
                 onClick={handleSubmit}
                  type="button" className=" btn">
          { languageChange?translate.sign.eng:translate.sign.tg}</button>
        
             
      </form>
      <p className='text-sm -mt-4'> {languageChange ? translate.already.eng : translate.already.tg} <span className='text-[#3AB0FF]'><Link to='/login'>{languageChange?translate.login.eng:translate.login.tg }</Link></span></p>
       {
        loading?<div className='mt-10 z-50'><LoadingSpiner/></div>:''
      }
      </div></div>
  )
}

export default Register