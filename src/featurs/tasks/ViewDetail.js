import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link, useLocation } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import SubTaskInsideAddTask from '../subTasks/SubTaskInsideAddTask'
import {
  selectCurrentTasks,
  tempTaskPopulate,
  tempTaskNull,
} from '../tasks/TaskSlice';
import translate from '../../Assets/translationLanguga';
import { useDispatch, useSelector } from 'react-redux'
function ViewDetail() {
  const dispatch=useDispatch()
  
  const {languageChange,tempTask} = useSelector(selectCurrentTasks)
  const location = useLocation() 
  console.log(location);
  
    
  const [task, settask] = useState(location.state?location.state.detail:tempTask)
  if (location.state) {
    dispatch(tempTaskPopulate(location.state.detail))
  }
  
    
  
    
  return (
    
    <div className=''>
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
         {
               languageChange?translate.viewdetail.eng:translate.viewdetail.tg
         }
        </div>
        <div className='text-[#F87474] mr-6'>
           
            <Link to='/editTask' state={{
              detail: task,
              url:'/viewtask'
            }}>
              {
                    languageChange?translate.edit.eng:translate.edit.tg
               }
                            </Link>

        </div>
        
    </div>

      </div>
      
     {task?
      <div className='flex flex-col items-center text-start'>
        <form className='flex flex-col gap-4 w-72 m-10 mt-5 items-center '>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.taskTitle.eng:translate.taskTitle.tg }</label>
            <div className='bigInputBox'>            
              {
task.title
              }

            </div>
           
         

          </div>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >{ languageChange?translate.dateAndTime.eng:translate.dateAndTime.tg }</label>
            
        <div              
              
                          className="bigInputBox">
                          {
                               <Moment format={`${'h'}:mm${"hh">=12?'P':"A"},DD/MM/YYYY`} >
                                    { task.dateTime}
                                    

                                </Moment>
                          }
          </div>
          
        
          </div>
          <div className='flex justify-between gap-5 '>
            <div>
              <label className='flex items-start text-start  font-bold mb-1 ' >{languageChange?translate.duration.eng:translate.duration.tg}</label>
              <div
          
         
          
                className='bigInputBox w-[150px] pl-2'
                
        >
          
                              {
                                 languageChange?task.duration:translate.durationData.tg[translate.durationData.eng.indexOf(task.duration)] 
          }
          

            </div>
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.reminder.eng:translate.reminder.tg }</label>
               <div
          
                className='bigInputBox w-[150px]  pl-2'
               
              >
                
              
          
                              {
                               languageChange?task.reminder:translate.reminderData.tg[translate.reminderData.eng.indexOf(task.reminder)]
         }
        </div>
            </div>
           
        
        

          </div>
          <div className='flex justify-between gap-5 '>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.category.eng:translate.category.tg}</label>
              <div
         
                className='bigInputBox w-[150px]  pl-2'
              >
          
                              {
                                  languageChange?task.category:translate.categoryData.tg[translate.categoryData.eng.indexOf(task.category)]
          }
        </div>

            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.priority.eng:translate.priority.tg}</label>
               
        <div
                
                className='bigInputBox w-[150px]  pl-2'
          >
          

                              {
                                 languageChange?translate.priorityData.eng[task.priority-1]:translate.priorityData.tg[task.priority-1]
          }
        </div>
        

            </div>
            
          </div>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.note.eng:translate.note.tg}</label>
            
            <div
                 
          className="bigInputBox h-32 ">
          
        
                          {
                             task.note
        }

          </div>
           </div>
                  {
                     task.subTask && task.subTask.length>0?<div>
                          <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.subtasks.eng:translate.subtasks.tg }</label>
                          {task.subTask.map((sub,index) =><SubTaskInsideAddTask subTask={sub } index={index+1} />)
                          }
          </div>:''
         }
         
          
        
        
                  
        
      
          <span className='flex gap-6 justify-between'>
             
        
        </span>
       
        
      </form>

      </div>:"loading....."}
      
     
      
    
    </div>
  )
}

export default ViewDetail