import React from 'react'
import { Checkbox } from 'react-input-checkbox'

const FilterCheckBox = (props) => {
  return (
      <div className='flex justify-items-start gap-2 mt-3'>
          <div
            //   onClick={()=>!props.filter}
              className=' rounded-[5px] h-4 w-4 bg-[#F9F2ED] border-2 border-[#C9B6A980] '></div>
          <div className='-mt-[1px] text-sm'>
              {props.atribute}
          </div> 
    </div>
  )
}

export default FilterCheckBox