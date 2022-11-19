import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link, useLocation } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import SubTaskInsideAddTask from '../subTasks/SubTaskInsideAddTask'
import { selectCurrentTasks } from '../tasks/TaskSlice';
import translate from '../../Assets/translationLanguga';
import { useSelector } from 'react-redux'
function ViewDetail() {
  const {languageChange} = useSelector(selectCurrentTasks)
    const location = useLocation() 
    
  const [detail, setdetail] = useState(location.state.detail)
  
    useEffect(() => {
      
      setdetail(location.state.detail)
     
      console.log(location.state.detail,"location insid");
      console.log(detail,"real state");
    }, [])
    
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
              detail: detail,
              url:'/viewtask'
            }}>
              {
                    languageChange?translate.edit.eng:translate.edit.tg
               }
                            </Link>

        </div>
        
    </div>

      </div>
      
     {detail?
      <div className='flex flex-col items-center text-start'>
        <form className='flex flex-col gap-4 w-72 m-10 mt-5 items-center '>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.title.eng:translate.title.tg }</label>
            <div className='bigInputBox'>            
              {
detail.title
              }

            </div>
           
         

          </div>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >{ languageChange?translate.dateAndTime.eng:translate.dateAndTime.tg }</label>
            
        <div              
              
                          className="bigInputBox">
                          {
                               <Moment format={`${'h'}:mm${"hh">=12?'P':"A"},DD/MM/YYYY`} >
                                    { detail.dateTime}
                                    

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
                                  detail.duration
          }
          

            </div>
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.reminder.eng:translate.reminder.tg }</label>
               <div
          
                className='bigInputBox w-[150px]  pl-2'
               
              >
                
              
          
                              {
                                  detail.reminder
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
                                  detail.category
          }
        </div>

            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.priority.eng:translate.priority.tg}</label>
               
        <div
                
                className='bigInputBox w-[150px]  pl-2'
          >
          

                              {
                                  detail.priority
          }
        </div>
        

            </div>
            
          </div>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.note.eng:translate.note.tg}</label>
            
            <div
                 
          className="bigInputBox h-32 ">
          
        
                          {
                              detail.note
        }

          </div>
           </div>
                  {
                      detail.subTask && detail.subTask.length>0?<div>
                          <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.subtasks.eng:translate.subtasks.tg }</label>
                          {detail.subTask.map((sub,index) =><SubTaskInsideAddTask subTask={sub } index={index+1} />)
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