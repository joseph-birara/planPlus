import React from 'react'
import { useSelector } from 'react-redux'
import Warning from '../../Assets/IconCollection/Warning'
import translate from '../../Assets/translationLanguga'
import { selectCurrentTasks } from '../tasks/TaskSlice'

const DeleteAccountConfirm = (props) => {
  const {languageChange} = useSelector(selectCurrentTasks)
  return (
      <div>
          <div className=' absolute bg-[#000000] w-screen h-screen bg-opacity-50 z-40 top-0 bottom-0 overflow-hidden'>
      <div className=' absolute w-[400px] h-28  bg-[#FFFFFF] opacity-100 text-center mr-7 z-50 bottom-0 left-[1%] md:left[25%] lg:left-[39%] '>
              <Warning />
              <p className='-mt-6 ml-1'> {props.item}</p>
              <div className='-mr-72 mt-4'>
        <span
          onClick={()=>props.handleYes()}
          className='font-semibold mr-4'>
              {
                languageChange?translate.yes.eng:translate.yes.tg
         }
        </span>
        <span
          className='text-blue-600 hover:cursor-pointer'
            onClick={()=>props.setWarning()}
        >  {
                languageChange?translate.no.eng:translate.no.tg
         }
        </span>
              </div>
          </div>
          
    </div>
    </div>
  )
}

export default DeleteAccountConfirm