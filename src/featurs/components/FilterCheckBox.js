import React from 'react'
import { Checkbox } from 'react-input-checkbox'
import newIcon from '../../Assets/AcountIcons/checkIcon.png'


const FilterCheckBox = (props) => {
  return (
    <div className='flex justify-items-start gap-2 mt-3'>
      <div className='relative'>
        <div
               onClick={()=>!props.checkUncheck()}
          className=' rounded-[5px] h-4 w-4 bg-[#F9F2ED] border-2 border-[#C9B6A980] '></div>
        {props.tureFalse?<div >
                  <img  className='h-3 w-7 absolute top-1 left-1 -mt-1 text-center text-lg' src={newIcon} alt='log'/>

                </div>:''}

      </div>
          
          <div className='-mt-[1px] text-sm'>
              {props.atribute}
          </div> 
    </div>
  )
}

export default FilterCheckBox