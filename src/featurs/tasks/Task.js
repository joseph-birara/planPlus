import React, { useState } from 'react'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { BiUpArrowAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
import SubTask from './SubTask'
function Task() {
    const [upArrow, setupArrow] = useState(false)
    const [edit, setedit] = useState(false)
    const [rating ,setrating] = useState(false)
    return (
      <div className='container'>
            
      
      <div className='task'>
          <div className='flex flex-col justify-between '>
              
              <div className='doneUndone'>
              <MdCheckBoxOutlineBlank />
          </div>
              <div onClick={() => setupArrow(!upArrow)} className='taskSubtask'>
                  
                  {upArrow?<BiUpArrowAlt/>:
                      <AiOutlineArrowDown /> 
                      
                  }
          </div>
          </div> 
          <div className='taskBody'>
              <div className='titelAndDescription'>
              <div className='title'>
                  hello
              </div>
              <div className='description'>
                 -- describ this Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae sit natus 
              </div>
              
              
              </div>
              <div className='starTime'>
                    <div className='star'>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                        <AiOutlineStar/>
                  </div>
                  <div className='duration'>
                      30 mixins
                  </div>
                  < div className='begin'>
                      0ct 3
                  </div>
                  <div className='catagory'>
                      education
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
              upArrow? <SubTask /> :''
                      
                      
                   
            }
            </div>
  )
}

export default Task