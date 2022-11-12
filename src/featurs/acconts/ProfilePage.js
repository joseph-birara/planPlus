import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import accountIcon from '../../Assets/AcountIcons/account.svg'
import {AiOutlineUpload} from 'react-icons/ai'
import IconsVisiblel from '../../Assets/IconCollection/IconsVisiblel'
import Icons from '../../Assets/IconCollection/Icons'
import {FiEdit2} from 'react-icons/fi'

const ProfilePage = () => {
    const [editName, seteditName] = useState(false)
    const [editPhone, seteditPhone] = useState(false)

    
    const [showAndHide ,setshowAndHide ]=useState(false)
    const [state, setstate] = useState({
        name: '',
        phone: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        password: '',
        confirmPassword:''
        

    })
    const handleChange = (e) => {
    setstate({...state,[e.target.name]:e.target.value})
}
  return (
      <div className='  '>
          <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-9/12 h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/account'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-sm  justify-center mt-2 mr-6 lg:mr-10'>
         Profile
        </div>
        <div className='text-[#3AB0FF] mr-6 text-lg'>
         save

        </div>
        
    </div>

          </div> 
          <div className='text-2xl font-black   flex flex-col justify-center ml-[41%] lg:ml-[47%]'>
              <div className='bg-[#F9F2ED] w-[65px] h-[70px] rounded-xl mt-5 text-center '>
                  <img className='mt-2' src={accountIcon} alt='log'/>
             </div>
                  
               <label className='bg-[#3AB0FF] w-[80px] h-7 rounded-[4px] text-sm flex text-white gap-2 text-center p-1 items-center mt-4 -ml-2' for="upload-photo"><AiOutlineUpload className='text-white text-lg'/> Upload</label>
<input className='opacity-0 -z-10' type="file" name="photo" id="upload-photo" />
                
          </div>
         <div className='flex flex-col items-center text-start'>
              <form className='flex flex-col gap-4 w-72 m-10 -mt-1 items-center '>
                   <div className='relative'> 
          <input
                
                  required
                  value={state.name}
                 onChange={handleChange}
                  type='text'
                  name="name"
                  id="name"
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
                  value={state.phone}
                 onChange={handleChange}
                  type='text'
                  name="phone"
                  id="phone"
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
                  value={state.dateOfBirth}
                 onChange={handleChange}
                  type='text'
                  name="dateOfBirth"
                          id="password"
                          disabled
                  placeholder="email"
            className="inputBox bg-[#C9B6A9] bg-opacity-50"
            
            
          />
         </div>
                  <div className='flex justify-between gap-5 '>
            <div>
             
              <select
          required
         
          onChange={handleChange}
          name="duration"
              id="duration"
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
          name='reminder'
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
                  value={state.password}
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
                  value={state.password}
                 onChange={handleChange}
                  type={showAndHide ===false? "password":"text"}
                  name="password"
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