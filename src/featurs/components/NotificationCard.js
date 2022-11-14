import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotificationCheckBox from '../../Assets/IconCollection/NotificationCheckBox'
import { DeleteNotification, GetAllNotifications } from '../tasks/TaskActions'
import { selectCurrentUsers } from '../user/userSlice'


const NotificationCard = (props) => {
    const [check, setcheck] = useState(false)
    const dispatch = useDispatch()
    const { userToken } = useSelector(selectCurrentUsers)

  return (
      <div>
           
      <div className='bigInputBox h-[60px] flex border-[1px] border-[#C9B6A980] p-0 w-80 lg:w-[410px] rounded-[10px]'>
              <div className='h-[60px] p-2 w-20  border-r-[1px] rounded-l-[10px] border-r-[#C9B6A980] bg-[#C9B6A9] m-0 bg-opacity-25 text-center '>
                  <div onClick={() => {
                      setcheck(!check)
                      dispatch(DeleteNotification({_id:props._id,userToken })).then(()=> dispatch(GetAllNotifications({userToken} )).then(()=>setcheck(false))
   )
                      
                  }}>
                       <div
                      
                      className={`border-[#C9B6A9] border-[1px]  w-5 h-5 ml-4 rounded-[3px] bg-[#FBF8F6]`}
                  >
                      
                  </div>
                      {check ? <div className='bg-[#C9B6A9] pt-[0px] w-5 h-5 -mt-7 ml-4 rounded-[3px '>
                          <div className=''>
                              <NotificationCheckBox />
                          </div>
                      </div> : null}
                      <span className={`${props.status==='Upcoming'? 'text-[#3AB0FF]':''} ${props.status==='Overdue'? 'text-[#F87474]':''} `}>
                           {props.status}
                          
             </span>
                  </div>
                 
          </div>
          <div className=''>
              <p className='text-start  line-clamp-2 mr-2 ml-2'>
                
                  <span className='font-normal text-base ml-1 mr-2'  >
                      {props.title}
                     </span>                
              
            
              </p>
             
          </div>
          
    </div>
  
    </div>
  )
}

export default NotificationCard