import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link, useLocation } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import SubTaskInsideAddTask from '../subTasks/SubTaskInsideAddTask'

function ViewDetail() {
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
          View details
        </div>
        <div className='text-[#F87474] mr-6'>
           
            <Link to='/editTask' state={{
              detail: detail,
              url:'/viewtask'
            }}>
               Edit
                            </Link>

        </div>
        
    </div>

      </div>
      
     {detail?
      <div className='flex flex-col items-center text-start'>
        <form className='flex flex-col gap-4 w-72 m-10 mt-5 items-center '>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >Task title</label>
            <div className='bigInputBox'>            
              {
detail.title
              }

            </div>
           
         

          </div>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >Date & time</label>
            
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
              <label className='flex items-start text-start  font-bold mb-1 ' >Duration</label>
              <div
          
         
          
                className='bigInputBox w-[150px] pl-2'
                
        >
          
                              {
                                  detail.duration
          }
          

            </div>
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Reminder</label>
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
              <label className='flex items-start text-start  font-bold mb-1' >Category</label>
              <div
         
                className='bigInputBox w-[150px]  pl-2'
              >
          
                              {
                                  detail.category
          }
        </div>

            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Priority</label>
               
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
            <label className='flex items-start text-start  font-bold mb-1' >Note</label>
            
            <div
                 
          className="bigInputBox h-32 ">
          
        
                          {
                              detail.note
        }

          </div>
           </div>
                  {
                      detail.subTask && detail.subTask.length>0?<div>
                          <label className='flex items-start text-start  font-bold mb-1' >Subtasks</label>
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