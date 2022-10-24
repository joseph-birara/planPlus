import React, { useState } from 'react'

import { AiFillStar,AiOutlineStar} from 'react-icons/ai'

import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
import DoneUndone from '../../Assets/IconCollection/DoneUndone'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteSubTask, GetAllTasks,  UpdateStatus,  UpdateSubTaskStatus } from './TaskActions'
import { BsDot,BsArrowRightShort } from 'react-icons/bs'
import Moment from 'react-moment'
import { selectCurrentUsers } from '../user/userSlice'




function SubTask(props) {
    const [edit, setedit] = useState(false)
    const subStars = [1, 2, 3, 4, 5]
    const { userToken } = useSelector(selectCurrentUsers)
    
    const [subShortDescription, setsubShortDescription] = useState(true)
    const dispatch = useDispatch()
    //delete

    const deleteHandler = async() => {
    console.log("inside in the function delet handler",userToken);
   await  dispatch(DeleteSubTask({ _id:props.subTask._id, userToken:userToken})).then
    (()=>dispatch(GetAllTasks({userToken:userToken})))
    
    }
    

    const handleSubTaskCancelAndDone = async (status) => {
        
        if (props.subTask.status === 'In progress' || props.subTask.status === 'upcoming') {
            
            //changes status and gets updated all tasks and subtasks
            await dispatch(UpdateSubTaskStatus({ _id: props.subTask._id, status: status, userToken }))
                .then(() => dispatch(GetAllTasks({ userToken: userToken })))
                .then(() => {
                let cal = true
              props.partent.forEach(sub => {
             if (sub.status !== status) {
                        cal = false
                    }
        })
        if (cal) {
            dispatch(UpdateStatus({ _id: props.task._id, status: status, userToken }))
                
        }
                })
            .then(()=>dispatch(GetAllTasks({userToken:userToken})))

            
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
                                    props.subTask.priority>index?<AiFillStar key={index}/>:<AiOutlineStar key={index}/>
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
                    <div className='mt-1  text-xl'>

                            <BsArrowRightShort className=''/>
                        </div>
                  < div className='begin'>
                       {
                            
                             <Moment format={`${'h'}:mm${"hh">=12?'P':"A"},MMM  DD,'YY`} >
                                    { props.subTask.dateTime}
                                    

                                </Moment>
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
                        <EditDeleteCancel deleteHandler={deleteHandler } task={props.subTask} cancelHandler={ handleSubTaskCancelAndDone} />
              
                    </div> : null}
                </div>
         
    </div>
    
  )
}

export default SubTask