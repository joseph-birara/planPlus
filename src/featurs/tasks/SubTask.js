import React, { useState } from 'react'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { BiUpArrowAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
function SubTask() {
    const [edit, setedit] = useState(false)
    return (
      
      
          <div className='task ml-20 border-t-8 max-w-lg'>
          <div className='flex flex-col justify-between '>
              
              <div className='doneUndone'>
              <MdCheckBoxOutlineBlank />
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
              <div className='starTime max'>
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
    
  )
}

export default SubTask