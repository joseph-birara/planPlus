import React, { useState } from 'react'

import { AiFillStar,AiOutlineStar} from 'react-icons/ai'

import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from '../tasks/EditDeleteCancel'
import DoneUndone from '../../Assets/IconCollection/DoneUndone'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteSubTask, GetAllTasks,  UpdateStatus,  UpdateSubTaskStatus } from '../tasks/TaskActions'
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
        
        if (props.subTask.status === 'In progress' || props.subTask.status === 'Upcoming') {
            
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
      
      
        <div className='task ml-[70px] border-t-2 border-[#C9B6A9] lg:h-28'>
            <div className='flex  justify-between'>
                <div className='flex justify-start'>
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
                    <div className='-ml-5'>
                        <div className='flex justify-between '>
                            <div className='titelAndDescription'>
              <p className='text-start mr-1'>
                
                                    <span className='font-semibold text-xl'  >
                                          {
                    props.subTask.title +'- '
                  }
                                    </span>                
              
                                    <span className='description font-medium'
                                        // onClick={() => setsubShortDescription(!subShortDescription)}
                                    >
                {
                                            // subShortDescription ? (props.subTask.note.length > 70 ? props.subTask.note.slice(0, 70) + '....' : props.subTask.note) :
                                                props.subTask.note
                  }
                        </span>
                        </p>
              
              
              </div>

                        </div>
              
             
              
          </div>
                </div>
                <div onClick={() =>setedit(!edit)} className='DeleteEdit mr-2'>
              <BsThreeDotsVertical />
              
          </div>
            </div>
            
          
             <div className='starTime text-center ml-12'>
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
                    <div className='mt-1 -mr-2 text-xl'>

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
          
         
          <div className='relative'>
          
           {
              edit?<div className='mt-2 mr-4'>
                        <EditDeleteCancel deleteHandler={deleteHandler } task={props.subTask} cancelHandler={ handleSubTaskCancelAndDone} />
              
                    </div> : null}
                </div>
         
    </div>
    
  )
}

export default SubTask