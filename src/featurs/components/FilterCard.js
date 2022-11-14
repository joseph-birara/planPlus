import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import FilterCheckBox from './FilterCheckBox'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import MultiRangeSlider from "multi-range-slider-react";
import '../../styles.css'



function FilterCard() {
  const arr =["1-very low","2-low","3-medium","4-high","5-very high"]
  const [minValue, set_minValue] = useState(1);
  const [maxValue, set_maxValue] = useState(5);
  const handleInput = (e) => {
	set_minValue(e.minValue);
	set_maxValue(e.maxValue);
};
  return (
      <div>
        <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
         Filter
        </div>
        <div className='text-[#F87474] mr-6 text-sm hover:cursor-pointer'>
          Apply

        </div>
        
    </div>

          </div>  
          <div className='flex flex-col items-center text-start'>
              <div className='flex flex-col gap-4 w-72  mt-5 items-center text-start mb-10'>
                  
          <table className='w-72'>
            <tr className='mb-5'>
              <td className='text-lg font-medium mb-5'>Categories</td>
            </tr>
            <tr>
              <td><FilterCheckBox atribute={"All"} /></td>
              <td><FilterCheckBox atribute={ "Education"} /></td>
            </tr>
            <tr>
              <td><FilterCheckBox atribute={"Work"} /></td>
              <td><FilterCheckBox atribute={ "Shopping"} /></td>
            </tr>
            <tr>
              <td><FilterCheckBox atribute={ "Family"} /></td>
             
            </tr>
            
            
            
            
            
            
                      
                  </table>
                  
        </div>
        <table className='w-72 -mt-3'>
          <tbody>
            <tr>
              <td>
 Priorities
              </td>
              <td>
 
              </td>
            </tr>
          </tbody>
        </table>
       
       
        <MultiRangeSlider
          minValue={minValue}
			maxValue={maxValue}
			onInput={(e) => {
				handleInput(e);
          }}
          className='w-80 bg-[#C9B6A9] border-0 bg-opacity-0 text-sm ml-7 mt-3' min={1}
          max={5}
          step={1}
          style={{ border: 'none', boxShadow: 'none', textShadow:'none' }}
          ruler={false}
          label={true}
          barLeftColor="#C9B6A9"
          barInnerColor="#FFB562"
          barRightColor="#C9B6A9"
          thumbLeftColor="#F87474"
          thumbRightColor="#F87474"
          minCaption={arr[minValue - 1]}
          maxCaption={arr[maxValue - 1]}
          
          
          baseClassName='multi-range-slider'
        ></MultiRangeSlider>
         <div className='flex flex-col gap-4 w-72   items-center text-start mt-10'>
                  
          <table className='w-72'>
            <tr className='mb-2'>
              <td className='text-xl font-medium mb-5'>Statuses</td>
            </tr>
            <tr>
              <td><FilterCheckBox atribute={"All"} /></td>
              <td><FilterCheckBox atribute={ "Overdue"} /></td>
            </tr>
            <tr>
              <td><FilterCheckBox atribute={"Upcoming"} /></td>
              <td><FilterCheckBox atribute={ "Canceled"} /></td>
            </tr>
            <tr>
              <td><FilterCheckBox atribute={"In progress"} /></td>
              <td><FilterCheckBox atribute={ "Done"} /></td>
             
            </tr>
            
            
            
            
            
            
                      
                  </table>
                  
        </div>
          </div>
    </div>
  )
}

export default FilterCard