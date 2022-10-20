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
import { UpdateStatus } from './TaskActions'
import { useDispatch } from 'react-redux'
import { BsDot,BsArrowRightShort } from 'react-icons/bs'



function Task(props) {
    const [upArrow, setupArrow] = useState(false)
    const [edit, setedit] = useState(false)
    const [priority, setpriority] = useState(false)
    const [shortDescription, setshortDescription] = useState(true)
    const stars = [1, 2, 3, 4, 5]
    const [done, setdone] = useState(false)
    const dispatch = useDispatch()
    const handleTaskCancelAndDone = (status) => {
        if (props.task.status === 'inprogress' || props.task.status === 'upcoming') {
            props.task.status = status
            dispatch(UpdateStatus(props.task.id,status))

            props.task.sub.foreach((subtask) => {
                subtask.status = status
                //this may be changed to subTaskUpdateStatus
                dispatch(UpdateStatus(subtask.id,status))
            })
        }
    }
    
    
    return (
        <div className='container rounded-2xl'>
            
            
      
      <div className='task p-3 rounded-2xl'>
          <div className='flex flex-col justify-between '>
              
                    <div
                        onClick={()=>handleTaskCancelAndDone('Done')}
                        className='doneUndone'>
                        {props.task.status==='Done'?
                            <div
                                className='absolute ml-3 mt-2'>
                            <DoneUndone/>
                            </div>:''
                        }
                       
                        <div
                            className={`checkBox m-3 ${props.task.status==='Done'? 'bg-[#3AB0FF] border-[#3AB0FF]':'' } ${props.task.status==='In progress'?'border-[#3AB0FF]':''} ${props.task.status==='Overdue'?'border-[#F87474]':''} ${props.task.status==='Canceled'? 'bg-[#F87474] border-[#F87474]':''}`}>

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
                             <span className='description font-medium text-lg' onClick={()=>setshortDescription(!shortDescription)}>
                 {
                     shortDescription? ( props.task.note.length>70 ? props.task.note.slice(0,70) +'....':props.task.note):props.task.note
                  }
                                </span>
                                
                           
              </p>
             
              
              
              </div>
              <div className='starTime text-center mt-2 mb-1'>
                        <div className='star'>
                            {
                                stars.map((item, index) => 
                                    props.task.priority>index?<AiFillStar />:<AiOutlineStar/>
                                )
                            }
                        
                        
                        </div>
                        <div className='text-[#C9B6A9] text-2xl'>
                            <BsDot/>
                        </div>
                  <div className='duration'>
                            {
                                props.task.duraion
                      }
                        </div>
                        <div className='mt-1 -ml-3 text-xl -mr-3'>

                            <BsArrowRightShort className=''/>
                        </div>
                  < div className='begin'>
                            {
                                props.task.dateTime
                      }
                        </div>
                        <div className='text-[#C9B6A9] text-2xl'>
                            <BsDot/>
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
                            <EditDeleteCancel task={props.task } cancelHandler={handleTaskCancelAndDone} />
              
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