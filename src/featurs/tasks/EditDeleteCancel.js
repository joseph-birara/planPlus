import React from 'react'
import { Link } from 'react-router-dom'


function EditDeleteCancel(props) {
  
  
  
  return (
    <div className={`${props.parent?'editDeleteCancel':'editDeleteCancelForSubTask'}`}>
      <div className='m-2'>
        <div
          onClick={() =>props.cancelHandler('Canceled')}
          className=' hover:cursor-pointer mb-2'>
              Cancel task
          </div>
        <div
          onClick={()=>props.editHandler()}
          className=' hover:cursor-pointer mb-2'>
          <Link to={`/${props.parent?'editTask':'editSubtask'}`} state={{
              detail: props.task,
              url:'/'
          }}>
             Edit task
            </Link>
            
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