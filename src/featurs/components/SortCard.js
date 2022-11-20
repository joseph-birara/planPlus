import React, { useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import FilterCheckBox from './FilterCheckBox'
import {sortingBypriority} from '../tasks/TaskSlice'
import { useDispatch, useSelector } from 'react-redux'
import translate from '../../Assets/translationLanguga'
import { selectCurrentTasks } from '../tasks/TaskSlice'

const SortCard = () => {
    const {languageChange} = useSelector(selectCurrentTasks)

  const [fromLower, setfromLower] = useState(false)
  const [fromhigher, setfromhigher] = useState(false)
  const dispatch = useDispatch()

  
  const checkUncheck = () => {
    setfromLower(true)
    setfromhigher(false)

  }
  const checkUncheckForFromHigher = () => {
    setfromhigher(true)
    setfromLower(false)

  }

  return (
    <div>
         <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-xl  justify-center mt-2 mr-6 lg:mr-10'>
         {
                languageChange?translate.sort.eng:translate.sort.tg
         }
        </div>
          <div
          
            className='text-[#F87474] mr-6 text-xl'>
            <Link to='/' state={{
              fromLower: fromLower,
              fromhigher: fromhigher,
              url:'sort'

            }}>
              {
                languageChange?translate.apply.eng:translate.apply.tg
         }

            </Link>
          

        </div>
        
    </div>

          </div> 
           <div className='flex flex-col items-center text-start -ml-16 lg:-ml-44'>
              <div className='flex flex-col gap-4 w-80  mt-5 items-center text-start mb-10 -ml-[100px] md:-ml-0 lg:-ml-0'>
                  <table className={`${languageChange?'w-[150px]':'w-52'}`}>
            <tr className='mb-5'>
              <td className='text-2xl font-bold mb-5'>{
                languageChange?translate.priorities.eng:translate.priorities.tg
         }</td>
                      </tr>
                      <tr className=''>
                          <td className=''>
                <FilterCheckBox atribute={
                languageChange?translate.low.eng:translate.low.tg
         } checkUncheck={checkUncheck } tureFalse={fromLower} />
                              
                              
              </td>
              <dt>
 <BsArrowRightShort className='mt-[18px] text-xl ' />
              </dt>
                          <td className='absolute -mt-[24px] left-[50%] lg:left-[50%] text-lg'>
                <span className='' >
                     
                             {
                languageChange?translate.high.eng:translate.high.tg
         }
                </span>       
                              
                          </td>
                          <td className='mt-5'>
                             
                          </td>
            </tr>
            <tr className=''>
                          <td className=''>
                <FilterCheckBox atribute={
                languageChange?translate.high.eng:translate.high.tg
         } checkUncheck={checkUncheckForFromHigher} tureFalse={ fromhigher} />
                              
                              
                          </td>
                          <dt>
 <BsArrowRightShort className='mt-4  text-xl ' />
              </dt>
                             <td className='absolute -mt-[24px] left-[50%] lg:left-[50%] text-lg '>{
                languageChange?translate.low.eng:translate.low.tg
         }</td>  
                              
                         
                          <td className='mt-5'>
                             
                          </td>
                      </tr>
                      </table>
                  
              </div>
              </div>
    </div>
  )
}

export default SortCard