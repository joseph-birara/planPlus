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
import EditSubTask from './EditSubTask'
import { selectCurrentTasks } from '../tasks/TaskSlice'
import translate from '../../Assets/translationLanguga';




function SubTask(props) {
    const {languageChange} = useSelector(selectCurrentTasks)
    const [edit, setedit] = useState(false)
    const subStars = [1, 2, 3, 4, 5]
    const { userToken } = useSelector(selectCurrentUsers)
    
    const [editForm, seteditForm] = useState(false)
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
                let cal = 1
                    props.parent.subTask?.forEach(sub => {
                        console.log(sub.status === status);
                        if (sub.status === status) {
                            cal++
                            console.log(cal, "inside");
                        }
                    });
                console.log("cal after all checks", cal);
                console.log("length=",props.parent.subTask.length);
            if (cal === props.parent.subTask.length) {
                console.log("cal inside oarent", cal);
                console.log("length=",props.parent.subTask.length);
            dispatch(UpdateStatus({ _id: props.parent._id, status: status, userToken })).then(()=>dispatch(GetAllTasks({userToken:userToken})))
                
        }
                })
            

            
        }
    }
    const editHandler = () =>
    {
        seteditForm(!editForm)
    }
    
    
    return (
      
      
        <div className='task ml-11 lg:ml-[70px] border-t-[5px] border-[#F9F2ED] lg:h-28 border-t-opacity-100 -mt-1'>
            <div className='flex  justify-between'>
                <div className='flex justify-start'>
                     <div
                     onClick={()=>handleSubTaskCancelAndDone('Done')}
                    className='doneUndone ml-0'>
                    {props.subTask.status==='Done'?
                            <div
                                className='absolute '>
                            <DoneUndone/>
                            </div>:''
                        }
              <div className={`checkBox mt-2 ${props.subTask.status==='Done'? 'bg-[#3AB0FF] border-[#3AB0FF]':'' } ${props.subTask.status==='In progress'?'border-[#3AB0FF]':''} ${props.subTask.status==='Overdue'?'border-[#F87474]':''} ${props.subTask.status==='Canceled'? 'bg-[#F87474] border-[#F87474]':''}`}>

             </div>
          </div>
                    <div className='-ml-4'>
                        <div className='flex justify-between '>
                            <div className='titelAndDescription'>
              <p className='text-start mr-1'>
                
                                    <span className='font-semibold text-base lg:text-lg opacity-75'  >
                                          {
                    props.subTask.title 
                  }
                                    </span>                
              
                                    
                        </p>
              
              
              </div>

                        </div>
              
             
              
          </div>
                </div>
                <div onClick={() =>setedit(!edit)} className='DeleteEdit mr-[1px]'>
              <BsThreeDotsVertical />
              
          </div>
            </div>
            
          
             <div className='starTime text-center ml-8 mt-3'>
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
                  <div className='duration mt-1 lg:mt-0'>
                            {
                                 languageChange ? props.subTask.duration :translate.durationData.tg[ translate.durationData.eng.indexOf(props.subTask.duration)]
                      }
                        </div>
                    <div className='mt-1  text-xl'>

                            <BsArrowRightShort className=''/>
                        </div>
                  < div className='begin mt-[6px] lg:mt-0'>
                       {
                            
                             <Moment format={`${'h'}:mm${"hh">=12?'P':"A"},MMM  DD,'YY`} >
                                    { props.subTask.dateTime}
                                    

                                </Moment>
                      }
                  </div>
                  
              </div>
          
         
          <div className='relative'>
          
           {
              edit?<div className=' mr-4'>
                        <EditDeleteCancel deleteHandler={deleteHandler } task={props.subTask} cancelHandler={ handleSubTaskCancelAndDone} editHandler ={editHandler} parent={false}/>
              
                    </div> : null}
            </div>
            {
                editForm ?
                    <EditSubTask task={props.subTask} editHandler={editHandler} /> : ''
            }
         
    </div>
    
  )
}

export default SubTask