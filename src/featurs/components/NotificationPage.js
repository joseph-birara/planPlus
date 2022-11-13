import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import NotificationIcone from '../../Assets/IconCollection/NotificationIcone'
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import { GetAllNotifications } from '../tasks/TaskActions'
import { selectCurrentTasks } from '../tasks/TaskSlice'
import { selectCurrentUsers } from '../user/userSlice'
import NotificationCard from './NotificationCard'


const NotificationPage = () => {
  const dispatch = useDispatch()
  const { userToken } = useSelector(selectCurrentUsers)
  const {notifications} =useSelector(selectCurrentTasks)

  useEffect(() => {
    dispatch(GetAllNotifications(userToken))
   
  }, [dispatch,userToken])
  
   return (
      <div className='  lg:mt-1  lg:ml-10 lg:mr-12 overflow-hidden'>
      <div className='flex justify-between mr-10 sm:mr-5 lg:ml-20 lg:mr-24 '>
                <div className='md:ml-10'>
                    
                   
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>
          </div>
          
             
                    <div className='flex flex-col gap-1 mt-11'>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
                        className=' iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-2'>
                         <NotificationIcone/>
                
                        </div>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
                        className=' iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-2'>
                         <AccountIcon/>
                
              </div>

                   
                    
              
              
          </div>
          
            </div>
            <div className='text-center text-2xl font-black -mt-12 -ml-32 lg:-ml-0'>
                Notifications
            </div>
            <div className='flex justify-center text-center content-center mt-4'>
                <div className='flex  flex-col m-12 mt-3 items-center gap-2 '>
           {
           notifications && notifications.length>0? notifications.forEach((notify => <NotificationCard status={notify.status} title={notify.title} _id={notify._id} />)):"no notification found"
           
                    }
                    
           
                    
            </div>

            </div>
            
            
            
            </div>
  )
}

export default NotificationPage