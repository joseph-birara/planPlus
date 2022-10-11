import React, { useState,useEffect,useRef } from 'react';
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'

import { useDispatch, useSelector } from "react-redux";
import {selectCurrentUsers} from './userSlice';
import {EmailForCode,ResetNewPassword} from './UserActions';
import { Link, useNavigate, } from 'react-router-dom';
import Icons from '../../Assets/IconCollection/Icons';
import IconsVisiblel from '../../Assets/IconCollection/IconsVisiblel';

function NewPassword() {

  const userref = useRef();
  const errorref = useRef();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
    const dispatch = useDispatch();
    const { success } = useSelector(selectCurrentUsers);
  const navigate = useNavigate();
  const [showAndHide, setshowAndHide] = useState(false);
    const handleSubmit =(e)=>{
        e.preventDefault();
        
       if(password && confirmPassword ){
           dispatch(ResetNewPassword({ password }))
           navigate('/login')
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
              Create new password
          </h3>
         
          <form className="m-2 flex flex-col gap-4 text-center items-center">
        
          <div className='relative'>
                  <input
                 ref = {userref}
                  required
                  value={password}
                 onChange={e => setpassword(e.target.value)}
                   type={showAndHide ===false? "password":"text"}
                  name="email"
                  id="email"
                  placeholder="New password "
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
                 ref = {userref}
                  required
                  value={confirmPassword}
                 onChange={e => setconfirmPassword(e.target.value)}
                  type="password"
                  name="email"
                  id="email"
                  placeholder="confirm password "
                      className="inputBox"
                  />
                <button
                  // onClick={this.onSubmitSignin}
                  
                  disabled = {!password || !confirmPassword}
                 onClick={handleSubmit}
                  type="button" className=" btn">
                  Save</button>
        
             
              </form>
      </div>
  )
}

export default NewPassword