import React from 'react'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'

const TermsOfUsePage = () => {
  return (
    <div>
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/account'><LeftArraw/> 
    </Link>
        </div> 
        <div className='text-center   justify-center mt-2 mr-6 lg:mr-10 text-lg'>
        terms of use
        </div>
        <div className='text-[#3AB0FF] mr-6 text-lg'>
          {
            "      "
         }

        </div>
        
    </div>

      </div>
      <div className='text-center mt-5'>
        terms of use .....
      </div>
    </div>
  )
}

export default TermsOfUsePage