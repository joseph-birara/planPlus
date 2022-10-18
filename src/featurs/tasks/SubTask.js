import React, { useState } from 'react'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { BiUpArrowAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import EditDeleteCancel from './EditDeleteCancel'
import DoneUndone from '../../Assets/IconCollection/DoneUndone'



function SubTask(props) {
    const [edit, setedit] = useState(false)
    const subStars = [1, 2, 3, 4, 5]
    const [done,setdone] = useState(false)
    const [subShortDescription, setsubShortDescription] = useState(true)
    return (
      
      
          <div className='task ml-20 border-t-4'>
          <div className='flex flex-col justify-between '>
              
                <div
                     onClick={()=>setdone(!done)}
                    className='doneUndone ml-0'>
                    {done?
                            <div
                                className='absolute ml-1 mt-1'>
                            <DoneUndone/>
                            </div>:''
                        }
              <div className={`checkBox mt-2 ${done? 'bg-[#3AB0FF] border-[#3AB0FF]':'' }  `}>

             </div>
          </div>
             
          </div> 
          <div className='taskBody'>
              <div className='mr-6 -ml-3 text-start font-medium'>
              <p className=''>
                 {
                    props.subTask.title
                  }
              
              <span className='description' onClick={()=>setsubShortDescription(!subShortDescription)}>
                {
                     subShortDescription? ( props.subTask.note.length>100? props.subTask.note.slice(0,100) +'....':props.subTask.note):props.subTask.note
                  }
                        </span>
                        </p>
              
              
              </div>
              <div className='starTime text-center mt-6 mb-0'>
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
          <div onClick={() =>setedit(!edit)} className='DeleteEdit mr-3'>
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