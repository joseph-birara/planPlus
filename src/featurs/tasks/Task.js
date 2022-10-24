import React, { useState } from 'react'

import { AiFillStar,AiOutlineStar} from 'react-icons/ai'

import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
import SubTask from './SubTask'

import UpArrow from '../../Assets/IconCollection/UpArrow'
import DownArrow from '../../Assets/IconCollection/DownArrow'
import DoneUndone from '../../Assets/IconCollection/DoneUndone'
import { DeleteTask, GetAllTasks, UpdateStatus,UpdateSubTaskStatus } from './TaskActions'
import { useDispatch, useSelector } from 'react-redux'
import { BsDot, BsArrowRightShort } from 'react-icons/bs'
import Moment from 'react-moment';
import { selectCurrentUsers } from '../user/userSlice'



function Task(props) {
    const [upArrow, setupArrow] = useState(false)
    const [edit, setedit] = useState(false)
    const [priority, setpriority] = useState(false)
    const [shortDescription, setshortDescription] = useState(true)
    const stars = [1, 2, 3, 4, 5]
    const [done, setdone] = useState(false)
    const dispatch = useDispatch()
    
    const { userToken } = useSelector(selectCurrentUsers)
    


    //delet

    const deleteHandler = async() => {
   await  dispatch(DeleteTask({ _id:props.task._id, userToken:userToken})).then
    (()=>dispatch(GetAllTasks({userToken:userToken})))
    
    }
    
    //this function changes status and dispachs updated tasks
    const handleTaskCancelAndDone = async(status) => {
        console.log('cancling on progress');
        if (props.task.status === 'In progress' || props.task.status === 'Upcoming') {
            console.log("update status inside task component",props.task._id,"and the status",status);
            
         await   dispatch(UpdateStatus({ _id: props.task._id, status: status,userToken })).then
    (()=>dispatch(GetAllTasks({userToken:userToken})))
            console.log("update status inside task component",props.task._id,"and the status",status);

            // props.task.subTask.foreach((subtask) => {               
                
            //     dispatch(UpdateSubTaskStatus({ _id: subtask._id, status: status,userToken }))
            // })
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
                                    props.task.priority>index?<AiFillStar key={index}/>:<AiOutlineStar key={index}/>
                                )
                            }
                        
                        
                        </div>
                        <div className='text-[#C9B6A9] text-2xl'>
                            <BsDot/>
                        </div>
                  <div className='duration'>
                            {
                                props.task.duration
                      }
                        </div>
                        <div className='mt-1 -ml-1 text-xl -mr-2'>

                            <BsArrowRightShort className=''/>
                        </div>
                  < div className='begin'>
                            {
                                <Moment format={`${'h'}:mm${"hh">=12?'P':"A"},MMM  DD,'YY`} >
                                    { props.task.dateTime}
                                    

                                </Moment>
                                
                               
                                

                               
                      }
                        </div>
                        <div className='text-[#C9B6A9] text-2xl'>
                            <BsDot/>
                        </div>
                  <div className='category text-console.log(); text-center mb-0 '>
                            {
                                props.task.category
                      }
                  </div>
              </div>
              
          </div>
         
          <div className='relative'>
          <div onClick={() =>setedit(!edit)} className='DeleteEdit'>
              <BsThreeDotsVertical />
              
          </div>
           {
              edit?<div className='-mt-3'>
                            <EditDeleteCancel  deleteHandler={deleteHandler } task={props.task } cancelHandler={handleTaskCancelAndDone} />
              
                    </div> : ''}
        </div>
         
            </div>
            {
                upArrow ? props.task.subTask.map((x,i) => 
                    <SubTask subTask={x} key ={i} partent ={props.task} />
                )  :''
                      
                      
                   
            }
            </div>
  )
}

export default Task