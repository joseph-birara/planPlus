import React, { useState } from 'react'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { BiUpArrowAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
import DoneUndone from '../../Assets/IconCollection/DoneUndone'
import { useDispatch } from 'react-redux'
import { UpdateStatus } from './TaskActions'
import { BsDot,BsArrowRightShort } from 'react-icons/bs'




function SubTask(props) {
    const [edit, setedit] = useState(false)
    const subStars = [1, 2, 3, 4, 5]
    const [done,setdone] = useState(false)
    const [subShortDescription, setsubShortDescription] = useState(true)
    const dispatch = useDispatch()
    const handleSubTaskCancelAndDone = (status) => {
        if (props.subTask.status === 'inprogress' || props.subTask.status === 'upcoming') {
            props.subTask.status = status
            //this may be changed to subTaskUpdateStatus
            dispatch(UpdateStatus(props.subTask.id,status))

            
        }
    }
    
    return (
      
      
          <div className='task ml-20 border-t-2 border-[#C9B6A9] lg:h-28'>
          <div className='flex flex-col justify-between '>
              
                <div
                     onClick={()=>handleSubTaskCancelAndDone('Done')}
                    className='doneUndone ml-0'>
                    {props.subTask.status==='Done'?
                            <div
                                className='absolute ml-1 mt-1'>
                            <DoneUndone/>
                            </div>:''
                        }
              <div className={`checkBox mt-2 ${props.subTask.status==='Done'? 'bg-[#3AB0FF] border-[#3AB0FF]':'' } ${props.subTask.status==='In progress'?'border-[#3AB0FF]':''} ${props.subTask.status==='Overdue'?'border-[#F87474]':''} ${props.subTask.status==='Canceled'? 'bg-[#F87474] border-[#F87474]':''}`}>

             </div>
          </div>
             
          </div> 
          <div className='taskBody'>
              <div className='mr-6 -ml-3 text-start font-medium'>
              <p className='font-semibold'>
                 {
                    props.subTask.title +'   '
                  }
              
              <span className='description font-medium' onClick={()=>setsubShortDescription(!subShortDescription)}>
                {
                     subShortDescription? ( props.subTask.note.length>70? props.subTask.note.slice(0,70) +'....':props.subTask.note):props.subTask.note
                  }
                        </span>
                        </p>
              
              
              </div>
              <div className='starTime text-center mb-3'>
                    <div className='star'>
                        {
                                subStars.map((item, index) => 
                                    props.subTask.priority>index?<AiFillStar />:<AiOutlineStar/>
                                )
                            }
                    </div>
                     <div className='text-[#C9B6A9] text-2xl'>
                            <BsDot/>
                        </div>
                  <div className='duration'>
                            {
                                props.subTask.duration
                      }
                        </div>
                    <div className='mt-1 -ml-3 text-xl -mr-3'>

                            <BsArrowRightShort className=''/>
                        </div>
                  < div className='begin'>
                       {
                                props.subTask.dateTime
                      }
                  </div>
                  
              </div>
              
          </div>
         
          <div className='relative'>
          <div onClick={() =>setedit(!edit)} className='DeleteEdit mr-3'>
              <BsThreeDotsVertical />
              
          </div>
           {
              edit?<div className='mt-2 mr-4'>
                        <EditDeleteCancel task={props.subTask} cancelHandler={ handleSubTaskCancelAndDone} />
              
                    </div> : null}
                </div>
         
    </div>
    
  )
}

export default SubTask