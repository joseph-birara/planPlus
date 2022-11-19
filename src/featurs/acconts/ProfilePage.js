import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import accountIcon from '../../Assets/AcountIcons/account.svg'
import {AiOutlineUpload} from 'react-icons/ai'
import IconsVisiblel from '../../Assets/IconCollection/IconsVisiblel'
import Icons from '../../Assets/IconCollection/Icons'
import {FiEdit2} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUsers } from '../user/userSlice'
import { ChangePassword, GetProfileInfo, UpdateProfile } from '../user/UserActions'

import moment from 'moment/moment.js'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const [editName, seteditName] = useState(false)
  const [editPhone, seteditPhone] = useState(false)
  const {userToken,profileInfo} = useSelector(selectCurrentUsers)
  useEffect(() => {
   dispatch(GetProfileInfo({userToken}))

    
  }, [])
  
    

    
  const [showAndHide, setshowAndHide] = useState(false)
  const [image, setImage] = useState('')
  // console.log(profileInfo,"from profile page");
  var dt = new Date();

// dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
  
  const [state, setstate] = useState({
      
        fullName:profileInfo?profileInfo.fullName:'',
        phoneNumber: profileInfo?profileInfo.phoneNumber:'',
        email: profileInfo?profileInfo.email:'',
        gender: profileInfo?profileInfo.gender:'',
    DoB: profileInfo ?new Date(profileInfo.DoB).toISOString().split('T')[0] : '',
        img:profileInfo ? profileInfo.img:'',
        password: '',
        confirmPassword:''
        

  })
   console.log(state,"state in profile");
    const handleChange = (e) => {
   setstate({...state,[e.target.name]:e.target.value})
    }
  const { fullName, phoneNumber, gender,DoB, password } = state
 
  
 
  
  const submitHandler = (e) => {
    e.preventDefault();
    
    const formData = new FormData(); 
    formData.append('img', image)
    formData.append('fullName', fullName)
    formData.append('phoneNumber', phoneNumber)
    formData.append('gender', gender)
    
    
    formData.append('DoB',DoB)
    // console.log(formData,"form data");
    dispatch(UpdateProfile({ formData, userToken })).then(()=>dispatch(GetProfileInfo({userToken})))
    if (state.password && state.confirmPassword && state.confirmPassword === state.password) {
      dispatch(ChangePassword({  password,userToken }))
    }
  }
  
  
  return (
      <div className='  '>
          <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/account'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
         Profile
        </div>
          <div
            onClick={submitHandler}
            className='text-[#3AB0FF] mr-6 text-lg hover:cursor-pointer'>
         save

        </div>
        
    </div>

          </div> 
          <div className='text-2xl font-black   flex flex-col justify-center ml-[41%] lg:ml-[47%]'>
              <div className='bg-[#F9F2ED] w-[65px] h-[70px] rounded-xl mt-5 text-center '>
                  <img className={` ${state.img?'w-full h-full rounded-xl':'mt-2'} `} src={state.img?state.img:accountIcon} alt='log'/>
             </div>
                  
               <label className='bg-[#3AB0FF] w-[80px] h-7 rounded-[4px] text-sm flex text-white gap-2 text-center p-1 items-center mt-4 -ml-2' htmlFor="upload-photo"><AiOutlineUpload className='text-white text-lg'/> Upload</label>
        <input
          filename={image} 
          onChange={e => setImage(e.target.files[0])} 
          type="file" 
          accept="image/*"
          
         
          className='opacity-0 -z-10'   name="file" id="upload-photo" />
                
          </div>
         <div className='flex flex-col items-center text-start'>
              <form className='flex flex-col gap-4 w-72 m-10 -mt-1 items-center '>
                   <div className='relative'> 
          <input
                
                  required
                  value={state.fullName}
                 onChange={handleChange}
                  type='text'
                  name="fullName"
                  id="fullName"
                  placeholder="Full name"
                          className="inputBox"
                          disabled={!editName}
            
            
          />
          <div onClick={() => 
            seteditName(!editName)
            
          }>
{ editName ?'':<FiEdit2 className='h-4 w-4 absolute top-2 right-2 text-center mr-1 mt-1 font-extralight'/>}
                      </div></div>
                  <div className='relative'> 
          <input
                
                  required
                  value={state.phoneNumber}
                 onChange={handleChange}
                  type='text'
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder=" Phone number "
                          className="inputBox"
                          disabled={!editPhone}
            
            
          />
          <div onClick={() => 
            seteditPhone(!editPhone)
            
          }>
{ editPhone ?'':<FiEdit2 className='h-4 w-4 absolute top-2 right-2 text-center mr-1 mt-1 font-extralight'/>}
                      </div></div>
                  <div className='relative'> 
          <input
                
                  required
                  value={state.email}
                 onChange={handleChange}
                  type='text'
                  name="email"
                          id="email"
                          disabled
                  placeholder="email"
            className="inputBox bg-[#C9B6A9] bg-opacity-50"
            
            
          />
         </div>
                  <div className='flex justify-between gap-5 '>
            <div>
             
              <select
                required
                value={state.gender}
         
          onChange={handleChange}
          name="gender"
              id="gender"
                className='bigInputBox w-[120px] lg:w-[136px] pl-2'
                placeholder='eg.2hrs'
        >
          
          
          <option>
           Gender
          </option>
          <option>
            male
          </option>
           
           <option>
            female
          </option>
           
            </select>
            </div>
            <div>
              
               <input
                name='DoB'
                value={state.DoB ? state.DoB:"DoB"}
                type='Date'
              onChange={handleChange}
              className='bigInputBox w-[120px] lg:w-[136px] pl-2'
                placeholder='DoB'
              >
                
              
          
          
        </input>
            </div>
           
        
        

          </div>
                  <div className='relative'> 
          <input
                
                  required
                  value={''}
                 onChange={handleChange}
                  type={showAndHide ===false? "password":"text"}
                  name="password"
                  id="password"
                  placeholder=" Password "
                 className="inputBox"
            
            
          />
          <div onClick={() => 
            setshowAndHide(!showAndHide)
            
          }>
{ showAndHide ?<IconsVisiblel/>:<Icons />}
                      </div></div>
                  <div className='relative'> 
          <input
                
                  required
                  value={''}
                 onChange={handleChange}
                  type={showAndHide ===false? "password":"text"}
                  name="confirmPassword"
                  id="password"
                  placeholder=" Confirm Password "
            className="inputBox"
            
            
          />
          <div onClick={() => 
            setshowAndHide(!showAndHide)
            
          }>

                      </div></div>
                  <div className='text-xs ml-4 lg:ml-2'>
                      Leave the password field empity if you don't want to change your password
                  </div>
                  
              </form>
          </div>
    </div>
  )
}

export default ProfilePage