import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import {RegisterUser} from './UserActions';
import { Link, useNavigate, } from 'react-router-dom';
import Icons from '../../Assets/IconCollection/Icons';
import IconsVisiblel from '../../Assets/IconCollection/IconsVisiblel';

function Register() {
  const userref = useRef();
  const errorref = useRef();
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [email, setemail] = useState('');
  const [showAndHide, setshowAndHide] = useState(false);
  const dispatch = useDispatch();
  const { success } = useSelector(selectCurrentUsers);
  const navigate = useNavigate();
  const handleSubmit =(e)=>{
        e.preventDefault();
        
       if(password && email ){
           dispatch(RegisterUser({ password,email }))
           navigate('/')
       }
        
  }
  
    

    useEffect(() => {
        userref.current.focus();
    }, []) 

  return (
    <div className='flex flex-col m-12 items-center gap-2'>
          <img  src={TooDoo_logo} alt='logo' className='m-10 h-14' />
          <h1 className='text-center text-4xl'>
              TooDoo
          </h1>
          <h3 className='mt-10 text-1xl lg:text-2xl'>
             Create an account with us
          </h3>
         
          <form className="m-2 flex flex-col gap-5 text-center items-center">
        
          
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
        />
        <div className='relative'> 
          <input
                
                  required
                  value={password}
                 onChange={e => setpassword(e.target.value)}
                  type={showAndHide ===false? "password":"text"}
                  name="password"
                  id="password"
                  placeholder=" password "
            className="inputBox"
            
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
                  placeholder="confirm password "
                      className="inputBox"
                  />
        <p className='text-center w-60 lg:w-80'> <input type="checkbox" class=" checked:bg-red-300 w-8 h-5" /> By sigining up, you agree to our <span className='text-[#3AB0FF]'><Link to ='/register'>Privacy policy </Link> </span>and <span className='text-[#3AB0FF]'><Link to ='/register'>terms of service </Link> </span></p>
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!email || !password}
                 onClick={handleSubmit}
                  type="button" className=" btn">
                  Sign up</button>
        
             
      </form>
      <p> Already have an account? <span className='text-[#3AB0FF]'><Link to ='/login'>Log in</Link></span></p>
      </div>
  )
}

export default Register