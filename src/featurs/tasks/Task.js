import React, { useState } from 'react'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { AiFillStar,AiOutlineStar,AiFillCheckSquare} from 'react-icons/ai'
import { BiUpArrowAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
import SubTask from './SubTask'
import { RiCheckboxBlankFill} from 'react-icons/ri'



function Task(props) {
    const [upArrow, setupArrow] = useState(false)
    const [edit, setedit] = useState(false)
    const [priority, setpriority] = useState(false)
    const [shortDescription, setshortDescription] = useState(true)
    const stars = [1, 2, 3, 4, 5]
    
    return (
        <div className='container'>
            
            
      
      <div className='task'>
          <div className='flex flex-col justify-between '>
              
                    <div
                        className='doneUndone'>    <input
                            type="checkbox" value="" className="checkBox" />
                    </div>
                <div
                    onClick={() => setupArrow(!upArrow)
                    }
                    className='taskSubtask'>
                  
                  {upArrow?<BiUpArrowAlt/>:
                      <AiOutlineArrowDown /> 
                      
                  }
                    </div>
          
          </div> 
          <div className='taskBody'>
              <div className='titelAndDescription'>
              <div className='title'>
                            {
                                props.task.title
                  }
              </div>
              <div className='description' onClick={()=>setshortDescription(!shortDescription)}>
                 {
                     shortDescription? ( props.task.note.length>100 ? props.task.note.slice(0,100) +'....':props.task.note):props.task.note
                  }
              </div>
              
              
              </div>
              <div className='starTime'>
                        <div className='star'>
                            {
                                stars.map((item, index) => 
                                    props.task.priority>index?<AiFillStar />:<AiOutlineStar/>
                                )
                            }
                        
                        
                  </div>
                  <div className='duration'>
                            {
                                props.task.duration
                      }
                  </div>
                  < div className='begin'>
                            {
                                props.task.dateTime
                      }
                  </div>
                  <div className='catagory'>
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
              edit?<div>
              <EditDeleteCancel/>
              
                    </div> : console.log(edit)}
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