import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import ConfirmationMessage from '../components/ConfirmationMessage'
import { DeleteUserAccount } from '../user/UserActions'
import { logeOutAndNullToken, selectCurrentUsers } from '../user/userSlice'

const DeleteAccount = () => {
  const [reason, setreason] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userToken } = useSelector(selectCurrentUsers)
  const [showWarning,setshowWarning] = useState(false)
  const handleDelete = () => {
    dispatch(DeleteUserAccount({ reason, userToken })).then(() => {
      dispatch(logeOutAndNullToken())
      navigate('/login')
    })
    
  }
  return (
    <div>
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/account'><LeftArraw/> 
    </Link>
        </div> 
        <div className='text-center   justify-center mt-2 mr-6 lg:mr-10 text-lg'>
         Delete account
        </div>
        <div className='text-[#3AB0FF] mr-6 text-lg'>
          {
            "      "
         }

        </div>
        
    </div>

      </div>
       {
        showWarning?<ConfirmationMessage setWarning ={setshowWarning} item ={'Are you sure you want to delet your account?'} handleYes={handleDelete} pathProp={'login'}/>:''
      }
      <div className='text-start mt-5 w-[360px] ml-[30%] lg:ml-[40%] mb-10'>
        please note that after deleting your account, you'l not be able to acces your data
      </div>
      <div className='relative ml-[30%] lg:ml-[40%]'>
            <textarea
                 maxLength={128}
                  required
                  value={reason}
                 onChange={(e)=>setreason(e.target.value)}
                  type="text"
                  name="note"
                  id="note"
                  placeholder="provide reason for account deletion"
          className="bigInputBox h-32  rounded-xl w-[360px]"
          
        />

        <div>
          <div className='h-4 w-4 absolute top-24 text-center mr-3 text-sm ml-[314px] mt-2'>
              {
                reason.length+"/"+128
              }
            </div>
        </div> 
        <div
           onClick={()=>setshowWarning(!showWarning)}
          className='btn w-40 ml-20 bg-[#F87474] h-10 text-center mt-8 pt-1 hover:cursor-pointer'>Delete account</div>

          </div>
    </div>
  )
}

export default DeleteAccount