import React, { useState } from 'react'

import { AiOutlineArrowDown } from 'react-icons/ai'
import { AiFillStar,AiOutlineStar,AiFillCheckSquare} from 'react-icons/ai'
import { BiUpArrowAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
import SubTask from './SubTask'
import { RiCheckboxBlankFill } from 'react-icons/ri'
import UpArrow from '../../Assets/IconCollection/UpArrow'
import DownArrow from '../../Assets/IconCollection/DownArrow'
import DoneUndone from '../../Assets/IconCollection/DoneUndone'



function Task(props) {
    const [upArrow, setupArrow] = useState(false)
    const [edit, setedit] = useState(false)
    const [priority, setpriority] = useState(false)
    const [shortDescription, setshortDescription] = useState(true)
    const stars = [1, 2, 3, 4, 5]
    const [done,setdone] = useState(false)
    
    
    return (
        <div className='container rounded-2xl'>
            
            
      
      <div className='task p-3 rounded-2xl'>
          <div className='flex flex-col justify-between '>
              
                    <div
                        onClick={()=>setdone(!done)}
                        className='doneUndone'>
                        {done?
                            <div
                                className='absolute ml-3 mt-2'>
                            <DoneUndone/>
                            </div>:''
                        }
                       
                        <div
                            className={`checkBox m-3 ${done? 'bg-[#3AB0FF] border-[#3AB0FF]':'' } ${props.task.status==='inprogress'?'border-[#3AB0FF]':''} ${props.task.status==='overdue'?'border-[#F87474]':''} ${props.task.status==='canceled'? 'bg-[#F87474] border-[#F87474]':''}`}>

                        </div>
                        
                         
                    </div>
                <div
                    onClick={() => setupArrow(!upArrow)
                    }
                    className='taskSubtask'>
                  
                  {upArrow?<UpArrow/>:
                      <DownArrow /> 
                      
                  }
                    </div>
          
          </div> 
          <div className='taskBody'>
              <div className='titelAndDescription'>
                        <p className='text-start'>
                            <span className='font-bold text-xl'>
                                 {
                                props.task.title
                  }

                            </span>
                             <span className='description font-medium' onClick={()=>setshortDescription(!shortDescription)}>
                 {
                     shortDescription? ( props.task.note.length>100 ? props.task.note.slice(0,100) +'....':props.task.note):props.task.note
                  }
              </span>
                           
              </p>
             
              
              
              </div>
              <div className='starTime text-center mt-6 mb-0'>
                        <div className='star'>
                            {
                                stars.map((item, index) => 
                                    props.task.priority>index?<AiFillStar />:<AiOutlineStar/>
                                )
                            }
                        
                        
                  </div>
                  <div className='duration'>
                            {
                                props.task.duraion
                      }
                  </div>
                  < div className='begin'>
                            {
                                props.task.dateTime
                      }
                  </div>
                  <div className='catagory text-xl text-center mb-0 -mt-1'>
                            {
                                props.task.catagory
                      }
                  </div>
              </div>
              
          </div>
         
          <div className='relative'>
          <div onClick={() =>setedit(!edit)} className='DeleteEdit'>
              <BsThreeDotsVertical />
              
          </div>
           {
              edit?<div className=''>
              <EditDeleteCancel/>
              
                    </div> : ''}
                </div>
         
            </div>
            {
                upArrow ? props.task.sub.map((x,i) => 
                    <SubTask subTask={x} key ={i} />
                )  :''
                      
                      
                   
            }
            </div>
  )
}

export default Task