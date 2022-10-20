import React from 'react'
import { useDispatch } from 'react-redux'
import { DeleteTask, UpdateStatus } from './TaskActions'


function EditDeleteCancel(props,{cancelHandler}) {
  const dispatch = useDispatch()
  return (
    <div className='editDeleteCancel'>
      <div className='m-2'>
        <div
          onClick={() => {
            cancelHandler('canceled')
            

          }}
          className=' hover:cursor-pointer mb-2'>
              Cancel
          </div>
          <div  className=' hover:cursor-pointer mb-2'>
             Edit
          </div>
        <div
          onClick={()=> dispatch(DeleteTask(props.task.id))}
          className=' hover:cursor-pointer'>
              Delete
          </div>

      </div>
          
          
    </div>
  )
}

export default EditDeleteCancel