import React, { useState } from 'react'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import NotificationIcone from '../../Assets/IconCollection/NotificationIcone'
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import AccountCard from './AccountCard'
import profile from '../../Assets/AcountIcons/profile.svg'
import language from '../../Assets/AcountIcons/language-choice.svg'
import theme from '../../Assets/AcountIcons/theme.svg'
import privacy from '../../Assets/AcountIcons/privcyPolicy.svg'
import terms from '../../Assets/AcountIcons/termsOfUse.svg'
import deleteIcon from '../../Assets/AcountIcons/deleteIcon.svg'
import signout from '../../Assets/AcountIcons/logOut.svg'
import logo from '../../TooDoo Logo/TooDoo_logo.svg'
import copyRight from '../../Assets/AcountIcons/copyRight.svg'
import  ConfirmationMessage  from '../components/ConfirmationMessage'
import { logeOutAndNullToken } from '../user/userSlice' 
import { useDispatch, useSelector } from 'react-redux'
import homeImage from '../../Assets/AcountIcons/home.svg'
import { Link } from 'react-router-dom'
import note from '../../Assets/IconCollection/note.svg'
import translate from '../../Assets/translationLanguga'
import { selectCurrentTasks } from '../tasks/TaskSlice'
import Home from '../../Assets/AcountIcons/Home'








const Account = () => {
  const {languageChange} = useSelector(selectCurrentTasks)
  const [confirm, setconfirm] = useState(false)
  const dispatch = useDispatch()
  //reset token during logout
  const handleYes = () => {
    dispatch(logeOutAndNullToken())
  }
  //back from log out
  const setWarning = () => {
    setconfirm(!confirm)
  }
  const handleSignout = () => {
    setconfirm(!confirm)
  }
  return (
    <div className='  lg:mt-1  lg:ml-10 lg:mr-12 overflow-hidden'>
      {
        confirm ? <ConfirmationMessage handleYes={handleYes} setWarning={setWarning} item={languageChange?translate.sureSignout.eng:translate.sureSignout.tg} pathProp={'login' } />:''
      }
      <div className='flex justify-between mr-10 sm:mr-5 lg:ml-20 lg:mr-24 '>
                <div className='mt-4 ml-0 lg:ml-10'>
                    
                   
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>
          </div>
          
             
                    <div className='flex flex-col gap-1 mt-11'>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
            className='  iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-2'>
            <Link to='/'>
             <Home/>
            </Link>
                        
                
                        </div>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
            className='  iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-[7px] pt-[12px] '>
            <Link to='/notify'>
              <NotificationIcone />

            </Link>
           
             
                
              </div>

                   
                    
              
              
          </div>
          
          </div>
         <div className='text-center text-2xl font-black -mt-12 -ml-80 md:-ml-0 lg:-ml-0'>
               {languageChange?translate.myaccount.eng:translate.myaccount.tg}
            </div>
            <div className='flex justify-center text-center content-center mt-4'>
                <div className='flex  flex-col m-12 mt-3 items-center gap-2 '>
                    
                    
          <AccountCard icon={profile} name={languageChange?translate.profile.eng:translate.profile.tg} path={"profile"} route={ true} /> 
          <AccountCard icon={language} name={languageChange?translate.languge.eng:translate.languge.tg} path={"language"}  route={ true} /> 
          <AccountCard icon={theme} name={languageChange?translate.theme.eng:translate.theme.tg} path={"theme"}  route={ true}/> 
          <AccountCard icon={privacy} name={languageChange?translate.privacy.eng:translate.privacy.tg} path={"terms"}  route={ true} /> 
          <AccountCard icon={terms} name={languageChange?translate.terms.eng:translate.terms.tg} path={"terms"}  route={ true}/> 
          <AccountCard icon={deleteIcon} name={languageChange?translate.deleteAccount.eng:translate.deleteAccount.tg} path={"deleteAccount"}  route={ true} /> 
          <AccountCard icon={signout } name={languageChange?translate.signout.eng:translate.signout.tg}route={ false} handleSignout={handleSignout} /> 
                    
            </div>

      </div>
       <table className='text-center font-semibold  text-xs flex flex-col justify-center'>
        
        <tr>
         
<img className='w-10 h-10 text-center ml-[45%] md:ml-[47%] lg:ml-[48%]' src={logo} alt = 'logo'/>
          

        </tr>
        <tr className='mt-2'>
         
 <span className='text-gray-800 ml-0 lg:-ml-2'>
version 0.0.1
        </span>
          
          
        </tr>
       
        <span className='flex gap-2 mt-2'>
          <img className='text-gray-800 w-3 h-3 text-center ml-[39%] md:ml-[44%] lg:ml-[47%] ' src={copyRight} alt='copy' ></img>
          <span className='-mt-[2px] text-gray-800'>2022 TooDoo</span>
          
        </span>
            </table>
          </div>
  )
}

export default Account