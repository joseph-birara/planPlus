import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Warning from '../../Assets/IconCollection/Warning'
import translate from '../../Assets/translationLanguga'
import { selectCurrentTasks } from '../tasks/TaskSlice'

function Message(props) {
  const {languageChange} = useSelector(selectCurrentTasks)
  return (
    <div className='w-full absolute md:w-[400px] lg:w-[400px] h-28  bg-[#FFFFFF] opacity-100 text-center mr-7 z-50 bottom-0 left-[1%] md:left[25%] lg:left-[39%] '>
              <Warning />
              <p className='-mt-6 -ml-12 md:-ml-0 lg:-ml-0'> {props.item}</p>
              <div className='-mr-72 mt-4'>
        <span
          onClick={()=>props.handleYes()}
          className='font-semibold mr-4'>
          <Link
            to={`/${props.pathProp}`}
            >{
                languageChange?translate.yes.eng:translate.yes.tg
         } </Link>
        </span>
        <span
          className='text-blue-600 hover:cursor-pointer'
            onClick={()=>props.setWarning()}
        > {
                languageChange?translate.no.eng:translate.no.tg
         }
        </span>
              </div>
          </div>
  )
}

export default Message