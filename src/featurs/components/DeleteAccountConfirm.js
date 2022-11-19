import React from 'react'
import Warning from '../../Assets/IconCollection/Warning'

const DeleteAccountConfirm = (props) => {
  return (
      <div>
          <div className=' absolute bg-[#000000] w-screen h-screen bg-opacity-50 z-40 top-0 bottom-0'>
      <div className=' absolute w-[400px] h-28  bg-[#FFFFFF] opacity-100 text-center mr-7 z-50 bottom-0 left-[5%] md:left[25%] lg:left-[38%] '>
              <Warning />
              <p className='-mt-6 ml-1'> {props.item}</p>
              <div className='-mr-72 mt-4'>
        <span
          onClick={()=>props.handleYes()}
          className='font-semibold mr-4'>
         Yes
        </span>
        <span
          className='text-blue-600 hover:cursor-pointer'
            onClick={()=>props.setWarning()}
        > No
        </span>
              </div>
          </div>
          
    </div>
    </div>
  )
}

export default DeleteAccountConfirm