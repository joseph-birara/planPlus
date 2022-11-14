import React, { useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import FilterCheckBox from './FilterCheckBox'
import {sortingBypriority} from '../tasks/TaskSlice'
import { useDispatch } from 'react-redux'

const SortCard = () => {
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
        <div className='bg-[#F9F2ED] flex  w-9/12 h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
         Sort
        </div>
          <div
          //   onClick={() => {
          //   dispatch(sortingBypriority())

          // }}
            className='text-[#F87474] mr-6 text-lg'>
            <Link to='/' state={{
              fromLower: fromLower,
              fromhigher: fromhigher,
              url:'sort'

            }}>
              Apply

            </Link>
          

        </div>
        
    </div>

          </div> 
           <div className='flex flex-col items-center text-start ml-10'>
              <div className='flex flex-col gap-4 w-80  mt-5 items-center text-start mb-10'>
                  <table className='w-72'>
            <tr className='mb-5'>
              <td className='text-xl font-medium mb-5'>Priorities</td>
                      </tr>
                      <tr className=''>
                          <td className=''>
                <FilterCheckBox atribute={`1(very low)`} checkUncheck={checkUncheck } tureFalse={fromLower} />
                              
                              
                          </td>
                          <td className='flex justify-start mt-4 text-sm gap-1 -ml-3'>
                              <BsArrowRightShort className='-ml-44 text-xl -mt-1' />
                             <span className='-mt-1'>5(very high)</span>  
                              
                          </td>
                          <td className='mt-5'>
                             
                          </td>
            </tr>
            <tr className=''>
                          <td className=''>
                <FilterCheckBox atribute={`5(very high)`} checkUncheck={checkUncheckForFromHigher} tureFalse={ fromhigher} />
                              
                              
                          </td>
                          <td className='flex justify-start mt-4 text-sm gap-1 -ml-3'>
                              <BsArrowRightShort className='-ml-44 text-xl -mt-1' />
                             <span className='-mt-1'>1(very low)</span>  
                              
                          </td>
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