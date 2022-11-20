import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner'
import DeleteAccountConfirm from '../components/DeleteAccountConfirm'
import { DeleteUserAccount } from '../user/UserActions'
import { logeOutAndNullToken, selectCurrentUsers } from '../user/userSlice'
import translate from '../../Assets/translationLanguga'
import { selectCurrentTasks } from '../tasks/TaskSlice'

const DeleteAccount = () => {
  const {languageChange} = useSelector(selectCurrentTasks)
  
  const [reason, setreason] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userToken, deleting } = useSelector(selectCurrentUsers)
  console.log(deleting ,"deleting");
  const [showWarning,setshowWarning] = useState(false)
  const handleDelete = () => {
    setshowWarning(!showWarning)
    dispatch(DeleteUserAccount({ reason, userToken })).then(() => {
      dispatch(logeOutAndNullToken())
      if (deleting === "done") {
         navigate('/login')
      }
     
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
         {languageChange?translate.deleteAccount.eng:translate.deleteAccount.tg}
        </div>
        <div className='text-[#3AB0FF] mr-6 text-lg'>
          {
            "      "
         }

        </div>
        
    </div>

      </div>
       {
        showWarning?<DeleteAccountConfirm setWarning ={setshowWarning} item ={languageChange?translate.sureDeletAccount.eng:translate.sureDeletAccount.tg} handleYes={handleDelete}/>:''
      }
      <div className='text-start mt-5 w-[360px] ml-[30%] lg:ml-[40%] mb-10'>
        {languageChange?translate.pleasnot.eng:translate.pleasnot.tg}
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
                  placeholder={languageChange?translate.reason.eng:translate.reason.tg}
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
          className='btn w-40 ml-20 bg-[#F87474] h-10 text-center mt-8 pt-1 hover:cursor-pointer'>{languageChange?translate.deleteAccount.eng:translate.deleteAccount.tg}</div>

      </div>
      {
        deleting==="rejected"?<h2>{languageChange?translate.deletFaild.eng:translate.deletFaild.tg}</h2>:''
      }
      {
       deleting==="loading"?<div className='mt-10 z-50'><LoadingSpiner/></div>:''
      }
    </div>
  )
}

export default DeleteAccount