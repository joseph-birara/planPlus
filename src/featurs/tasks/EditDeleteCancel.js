import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUsers } from '../user/userSlice'
import { DeleteTask, GetAllTasks, UpdateStatus } from './TaskActions'
import { selectCurrentTasks } from './TaskSlice'


function EditDeleteCancel(props) {
  const {userToken} = useSelector(selectCurrentUsers)
  
  const dispatch = useDispatch()
  //function to delete and fetch the updated one
  const deleteHandler = () => {
    console.log("inside delet handler",props.task._id,userToken.Token);
    dispatch(DeleteTask({ _id: props.task._id, userToken: userToken.Token }))
    dispatch(GetAllTasks({userToken:userToken.Token}))
    
  }
  return (
    <div className='editDeleteCancel'>
      <div className='m-2'>
        <div
          onClick={() =>props.cancelHandler('Canceled')}
          className=' hover:cursor-pointer mb-2'>
              Cancel task
          </div>
          <div  className=' hover:cursor-pointer mb-2'>
             Edit task
          </div>
        <div
          onClick={() => deleteHandler()          
          }
          className=' hover:cursor-pointer'>
              Delete task
          </div>

      </div>
          
          
    </div>
  )
}

export default EditDeleteCancel