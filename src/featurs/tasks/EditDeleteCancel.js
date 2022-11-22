import React from 'react'
import { Link } from 'react-router-dom'
import { selectCurrentTasks } from '../tasks/TaskSlice';
import translate from '../../Assets/translationLanguga';
import { useSelector } from 'react-redux';


function EditDeleteCancel(props) {
  
  const {languageChange} = useSelector(selectCurrentTasks)
  
  return (
    <div className={`${props.parent?'editDeleteCancel':'editDeleteCancelForSubTask'}`}>
      <div className='m-1'>
        {
          props.parent? <div
                   
          
            className=' hover:cursor-pointer'>
            <Link to='/addsubtask'
              state={{
                url: '/',
                parentId: props.task
                
              }}
            >
           
          {
            languageChange?translate.homeAddSubtask.eng:translate.homeAddSubtask.tg
              }
              </Link>
          </div> :''
        }
         <div
          onClick={()=>props.editHandler()}
          className=' hover:cursor-pointer mb-2'>
          <Link to={`/${props.parent?'editTask':'editSubtask'}`} state={{
              detail: props.task,
              url:'/'
          }}>
            {
            languageChange?translate.editTask.eng:translate.editTask.tg
             }
            </Link>
            
          </div>
        <div
          onClick={() =>props.cancelHandler('Canceled')}
          className=' hover:cursor-pointer mb-2'>
              {
            languageChange?translate.cancelTask.eng:translate.cancelTask.tg
             }
          </div>
       
        <div
          onClick={() =>props.deleteHandler()          
          }
          className=' hover:cursor-pointer hover:text-red-500'>
          {
            languageChange?translate.deleteTask.eng:translate.deleteTask.tg
             }
        </div>

      </div>
          
          
    </div>
  )
}

export default EditDeleteCancel