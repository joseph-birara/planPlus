import React from 'react'
import { BsArrowRightShort, BsDot } from 'react-icons/bs'
import Moment from 'react-moment'

function SubTaskInsideAddTask( props) {
  return (
      <div className='bigInputBox h-[80px] flex border-[1px] border-[#C9B6A980] mb-6'>
          <div className='pt-3 text-gray-400 h-[80px] -mt-2 -ml-2 w-14  border-r-[1px] border-r-[#C9B6A980] '>
              {
                  props.index
            }
          </div>
          <div className=''>
              <p className='text-start mr-1'>
                
                  <span className='font-normal text-base ml-1'  >
                      
                                          {
                    props.subTask.title 
                  }
                                    </span>                
              
                                    
              </p>
              <div className='flex justify-start text-center ml-1 mt-2 text-xs'>
                  <div className=''>
                    { props.subTask.priority}
                        
                    </div>
                     <div className='text-[#C9B6A9] text-2xl -mt-1'>
                            <BsDot/>
                        </div>
                  <div className='duration'>
                      
                            {
                                props.subTask.duration
                      }
                        </div>
                    <div className='mt-0 text-xl'>

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
          
    </div>
  )
}

export default SubTaskInsideAddTask