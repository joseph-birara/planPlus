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
import translate from '../../Assets/translationLanguga'
import { selectCurrentTasks } from '../tasks/TaskSlice'
import DropDown from '../components/DropDown'
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner'

const ProfilePage = () => {
  const {languageChange} = useSelector(selectCurrentTasks)
  const dispatch = useDispatch()
  const [editName, seteditName] = useState(false)
  const [editPhone, seteditPhone] = useState(false)
  const { userToken, profileInfo } = useSelector(selectCurrentUsers)
  const [reminderSwitch,setReminderSwich] = useState(false)
  const swichTataRemider = () => {
    setReminderSwich(!reminderSwitch)
  }
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
  
  const gender_duration_Updater = (someValue) => {
    setstate({...state,gender:someValue})
  }
  const { genderTata, setGenderTata } = useState(false)
  const setTataFunc = () => {
    setGenderTata(!genderTata)
  }
  const {profileLoding} = useSelector(selectCurrentUsers)
  return (
      <div className=' '>
          <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-12 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/account'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-xl  justify-center mt-2 mr-6 lg:mr-10'>
            {
              languageChange?translate.profile.eng:translate.profile.tg
         }
        </div>
          <div
            onClick={submitHandler}
            className='text-[#3AB0FF] mr-6 text-xl hover:cursor-pointer'>
         { languageChange?translate.save.eng:translate.save.tg}

        </div>
        
    </div>

          </div> 
          <div className='text-2xl font-black   flex flex-col justify-center ml-[38%] lg:ml-[46%]'>
              <div className={`bg-[#F9F2ED] w-[110px] h-[110px] rounded-3xl mt-5 text-center ${!state.img?'rounded-3xl':''}`}>
                  <img className={` ${state.img?'w-full h-full rounded-xl':'mt-6 ml-[12px] rounded-[30px]'} `} src={state.img?state.img:accountIcon} alt='log'/>
             </div>
                  
               <label className='bg-[#3AB0FF] w-[110px] h-9 rounded-[6px] text-lg flex text-white gap-2 text-center p-1 items-center mt-4 -ml-[1px] lg:-ml-0' htmlFor="upload-photo"><AiOutlineUpload className='text-white text-2xl -mt-1'/>  { languageChange?translate.upload.eng:translate.upload.tg}
 </label>
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
                  placeholder=  { languageChange?translate.name.eng:translate.name.tg}

                          className="inputBox w-80 h-10 rounde-[10px]"
                          
            
            
          />
          <div onClick={() => 
            seteditName(!editName)
            
          }>
{editName?'':<FiEdit2 className='h-4 w-4 absolute top-2 right-2 text-center mr-1 mt-1 font-extralight'/>
}                      </div></div>
                  <div className='relative'> 
          <input
                
                  required
                  value={state.phoneNumber}
                 onChange={handleChange}
                  type='text'
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder=  { languageChange?translate.phone.eng:translate.phone.tg}

                          className="inputBox w-80 h-10 rounde-[10px]"
                          
            
            
          />
          <div onClick={() => 
            seteditPhone(!editPhone)
            
          }>
{editPhone?"":<FiEdit2 className='h-4 w-4 absolute top-2 right-2 text-center mr-1 mt-1 font-extralight'/>
}                      </div></div>
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
            className="inputBox bg-[#C9B6A9] bg-opacity-50 w-80 h-10 rounde-[10px]"
            
            
          />
          
         </div>
                  <div className='flex justify-between gap-5 '>
            <div className=''>
             
              <DropDown
          
         
                place={ languageChange?translate.gender.eng:translate.gender.tg}
                swichTata={swichTataRemider}
                tata={reminderSwitch}
                realValue={state.gender}
                setValuesOfSelect={gender_duration_Updater}
                data={languageChange ? translate.genderData.eng : translate.genderData.tg}
                
               
        />
          
          
          
          
            </div>
            <div>
              
               <input
                name='DoB'
                value={state.DoB ? state.DoB:"DoB"}
                type='Date'
              onChange={handleChange}
              className='bigInputBox w-[150px] lg:w-[150px] pl- h-10 rounded-[10px]'
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
                  placeholder=  { languageChange?translate.password.eng:translate.password.tg}

                 className="inputBox w-80 h-10 rounde-[10px]"
            
            
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
                  placeholder=  { languageChange?translate.cpassword.eng:translate.cpassword.tg}

            className="inputBox w-80 h-10 rounde-[10px]"
            
            
          />
          <div onClick={() => 
            setshowAndHide(!showAndHide)
            
          }>

                      </div></div>
                  <div className='text-xs w-80 ml-[2px] '>
                     { languageChange?translate.leaveEmty.eng:translate.leaveEmty.tg}
                  </div>
                  
              </form>
      </div>
      {
        profileLoding?<div className='mt-10 z-50'><LoadingSpiner/></div>:''
      }
    </div>
  )
}

export default ProfilePage