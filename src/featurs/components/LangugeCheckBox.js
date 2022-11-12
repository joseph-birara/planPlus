import React from 'react'

const LangugeCheckBox = (props) => {
  return (
      <div className='flex justify-items-start gap-2 mt-3'>
          <div
            //   onClick={()=>!props.filter}
              className=' rounded-[5px] h-6 w-6 bg-[#F9F2ED] '></div>
          <div className='-mt-[4px] text-lg ml-5 -'>
              {props.atribute}
          </div> 
    </div>
  )
}

export default LangugeCheckBox