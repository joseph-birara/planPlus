import React from 'react'


function EditDeleteCancel(props) {
  
  
  
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
          onClick={() =>props.deleteHandler()          
          }
          className=' hover:cursor-pointer'>
              Delete task
          </div>

      </div>
          
          
    </div>
  )
}

export default EditDeleteCancel