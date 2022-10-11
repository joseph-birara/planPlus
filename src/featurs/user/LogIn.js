import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import {Login} from './UserActions';
import { Link, useNavigate, } from 'react-router-dom';

import Icons from './Icons';
import IconsVisiblel from './IconsVisiblel';

function LogIn() {
  const userref = useRef();
  const errorref = useRef();
  const [password, setpassword] = useState();
  const [email, setemail] = useState();
  const dispatch = useDispatch();
  const { success } = useSelector(selectCurrentUsers);
const navigate = useNavigate();
const [showAndHide, setshowAndHide] = useState(false);
  const handleSubmit =(e)=>{
        e.preventDefault();
        
       if(password && email ){
           dispatch(Login({ password,email }))
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
          <h3 className='mt-10 text-1xl'>
              Log in to continue
          </h3>
         
          <form className="m-2 flex flex-col gap-4 text-center items-center">
        
          
                  <input
                 ref = {userref}
                  required
                  value={password}
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
        <p> Forget password? <span className='text-[#3AB0FF]'><Link to ='/newemail'>Reset</Link></span></p>
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!email || !password}
                 onClick={handleSubmit}
                  type="button" className=" btn">
                  Log in</button>
        
             
      </form>
      <p> New to TooDoo? <span className='text-[#3AB0FF]'><Link to ='/register'>Register</Link></span></p>
      </div>
  )
}

export default LogIn