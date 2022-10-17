import React, { useState } from 'react'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { BiUpArrowAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
function SubTask(props) {
    const [edit, setedit] = useState(false)
    const subStars = [1, 2, 3, 4, 5]
    const [subShortDescription, setsubShortDescription] = useState(true)
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
                 {
                    props.subTask.title
                  }
              </div>
              <div className='description' onClick={()=>setsubShortDescription(!subShortDescription)}>
                {
                     subShortDescription? ( props.subTask.note.length>100? props.subTask.note.slice(0,100) +'....':props.subTask.note):props.subTask.note
                  }
              </div>
              
              
              </div>
              <div className='starTime max'>
                    <div className='star'>
                        {
                                subStars.map((item, index) => 
                                    props.subTask.priority>index?<AiFillStar />:<AiOutlineStar/>
                                )
                            }
                  </div>
                  <div className='duration'>
                      {
                                props.subTask.duration
                      }
                  </div>
                  < div className='begin'>
                       {
                                props.subTask.dateTime
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
    
  )
}

export default SubTask