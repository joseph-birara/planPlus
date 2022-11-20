import React, { useState } from 'react'

import { AiFillStar,AiOutlineStar} from 'react-icons/ai'

import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
import SubTask from '../subTasks/SubTask'

import UpArrow from '../../Assets/IconCollection/UpArrow'
import DownArrow from '../../Assets/IconCollection/DownArrow'
import DoneUndone from '../../Assets/IconCollection/DoneUndone'
import { DeleteTask, GetAllTasks, UpdateStatus,UpdateSubTaskStatus } from './TaskActions'
import { useDispatch, useSelector } from 'react-redux'
import { BsDot, BsArrowRightShort } from 'react-icons/bs'
import Moment from 'react-moment';
import { selectCurrentUsers } from '../user/userSlice'

import AddSubTask from '../subTasks/AddSubTask'
import Editask from './Editask'
import { Link } from 'react-router-dom'
import { selectCurrentTasks } from '../tasks/TaskSlice';
import translate from '../../Assets/translationLanguga';



function Task(props) {
    const [upArrow, setupArrow] = useState(false)
    const [edit, setedit] = useState(false)
    const [editForm, seteditForm] = useState(false)
    const [createSubtask, setcreateSubtask] = useState(false)
    const stars = [1, 2, 3, 4, 5]
    //const [done, setdone] = useState(false)
    const dispatch = useDispatch()
    
    const { userToken } = useSelector(selectCurrentUsers)
    
const {languageChange} = useSelector(selectCurrentTasks)

    //delet

    const deleteHandler = async() => {
        await dispatch(DeleteTask({ _id: props.task._id, userToken: userToken }))
            .then(()=>dispatch(GetAllTasks({userToken:userToken})))
    
    }
    const handleClick = () => {
        setTimeout(() => {
            dispatch(GetAllTasks({ userToken }))
            setcreateSubtask(!createSubtask)
        }, 2000);
        
    }
    //this function changes status and dispachs updated tasks
    const handleTaskCancelAndDone = async(status) => {
        console.log('cancling on progress');
        if (props.task.status === 'In progress' || props.task.status === 'Upcoming') {
            console.log("update status inside task component",props.task._id,"and the status",status);
            
            await dispatch(UpdateStatus({ _id: props.task._id, status: status, userToken }))
                .then
    (()=>dispatch(GetAllTasks({userToken:userToken})))
            console.log("update status inside task component",props.task._id,"and the status",status);

             props.task.subTask?.foreach((subtask) => {               
                 if (props.subtask.status === 'In progress' || props.subtask.status === 'Upcoming') {
                     dispatch(UpdateSubTaskStatus({ _id: subtask._id, status: status, userToken }))
                 }
             })
        }
    }
    const editHandler = () =>setTimeout(() => {
        seteditForm(!editForm)
    }, 2000);
   

    
    
    return (
        <div className='container rounded-xl'>            
            
      
            <div className='task p-1 lg:p-2 rounded-xl'>
                <div className='flex flex-auto justify-between'>
                    <div className='flex'>
                        <div className='flex flex-col justify-between '>
              
                    <div
                        onClick={()=>handleTaskCancelAndDone('Done')}
                        className='doneUndone'>
                        {props.task.status==='Done'?
                            <div
                                className='absolute ml-[14px] mt-3 lg:ml-[16px]lg:mt-[16px]'>
                            <DoneUndone/>
                            </div>:''
                        }
                       
                        <div
                            className={`checkBox m-3 ${props.task.status==='Done'? 'bg-[#3AB0FF] border-[#3AB0FF]':'' } ${props.task.status==='In progress'?'border-[#3AB0FF]':''} ${props.task.status==='Overdue'?'border-[#F87474]':''} ${props.task.status==='Canceled'? 'bg-[#F87474] border-[#F87474]':''}`}>

                        </div>
                        
                         
                    </div>
                            {props.task.subTask && props.task.subTask.length>0?<div
                    onClick={() => setupArrow(!upArrow)
                    }
                    className='taskSubtask'>
                  
                  {upArrow?<UpArrow/>:
                      <DownArrow /> 
                      
                  }
                    </div>:''}
          
                        </div> 
                        <div
                            
                            className='taskBody pt-3'>
                            <Link to='/viewtask' state={{
                                detail:props.task
                            }}>
                    <div className='flex justify-between flex-wrap'>
                        <div className='titelAndDescription'>
                        <p className='text-start line-clamp-2'>
                            <span className='font-bold text-base lg:text-lg opacity-75'>
                                 {
                                props.task.title
                  }

                            </span>
                                        
                                
                           
              </p>
             
              
              
          </div>
              
              
                    </div>
                </Link>
                        </div>


                    </div>
                     
               
                <div onClick={() =>setedit(!edit)} className='DeleteEdit'>
              <BsThreeDotsVertical />

                </div>
                </div>
         
                 <div className=''>
          
           {
              edit?<div className='relative'>
                            <EditDeleteCancel  deleteHandler={deleteHandler } task={props.task } cancelHandler={handleTaskCancelAndDone} editHandler ={editHandler} parent={true} />
              
                    </div> : ''}
        </div>

                
              <div className={`starTime text-center  ml-9 lg:ml-14 -mt-11 ${props.task.subTask && props.task.subTask.length>0?'':'-mb-0 lg:-mb-[6px]'}`}>
                        <div className='star text-xs md:text-base lg:text-lg'>
                            {
                                stars.map((item, index) => 
                                    props.task.priority>index?<AiFillStar key={index}/>:<AiOutlineStar key={index}/>
                                )
                            }
                        
                        
                        </div>
                        <div className='text-[#C9B6A9] text-2xl'>
                            <BsDot/>
                        </div>
                  <div className='duration text-base'>
                            {
                            languageChange ? props.task.duration :translate.durationData.tg[ translate.durationData.eng.indexOf(props.task.duration)]
                            
                      }
                        </div>
                        <div className='mt-[2px] text-xl'>

                            <BsArrowRightShort className=''/>
                        </div>
                  < div className='begin text-xs md:text-base lg:text-base mt-1 md:mt-0 lg:mt-0'>
                            {
                                <Moment format={`${'h'}:mm${"hh">=12?'P':"A"},MMM  DD,'YY`} >
                                    { props.task.dateTime}
                                    

                                </Moment>
                                
                               
                                

                               
                      }
                        </div>
                        <div className='text-[#C9B6A9] text-2xl'>
                            <BsDot/>
                        </div>
                  <div className='category  text-center mb-2 text-sm lg:text-base'>
                            {
                                 languageChange ? props.task.category :translate.categoryData.tg[ translate.categoryData.eng.indexOf(props.task.category)]
                      }
                  </div>
              </div>
              
          
         
         
         
            </div>
            {
                upArrow ? props.task.subTask.map((x,i) => 
                    <SubTask subTask={x} key={i} parent={props.task} />
                )  :''
                      
                        
                   
            }
            {/* {upArrow ?
                <span>
                <span onClick={() => setcreateSubtask(!createSubtask)}
                className='btn'>
                    add sub task
                </span>
                {
                    createSubtask? <div>
                        <AddSubTask task={props.task } handleClick={handleClick} />
                    </div>:''
                }
                 </span>: ''} */}
            {
                editForm ?
                    <Editask task={props.task} editHandler={editHandler }/> : ''
            }
            
            </div>
  )
}

export default Task