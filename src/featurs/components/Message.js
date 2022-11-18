import React from 'react'
import { Link } from 'react-router-dom'
import Warning from '../../Assets/IconCollection/Warning'

function Message(props) {
  return (
    <div className=' absolute w-[400px] h-28  bg-[#FFFFFF] opacity-100 text-center mr-7 z-50 bottom-0 left-[5%] md:left[25%] lg:left-[38%] '>
              <Warning />
              <p className='-mt-6 ml-1'> {props.item}</p>
              <div className='-mr-72 mt-4'>
        <span
          onClick={()=>props.handleYes()}
          className='font-semibold mr-4'>
          <Link to={`/${props.pathProp}`}>Yes </Link>
        </span>
        <span
          className='text-blue-600 hover:cursor-pointer'
            onClick={()=>props.setWarning()}
        > No
        </span>
              </div>
          </div>
  )
}

export default Message