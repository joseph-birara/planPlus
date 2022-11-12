import React from 'react'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import FilterCheckBox from './FilterCheckBox'

function FilterCard() {
  return (
      <div>
        <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-9/12 h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-sm  justify-center mt-2 mr-6 lg:mr-10'>
         Filter
        </div>
        <div className='text-[#F87474] mr-6 text-sm'>
          Apply

        </div>
        
    </div>

          </div>  
          <div className='flex flex-col items-center text-start'>
              <div className='flex flex-col gap-4 w-72  mt-5 items-center text-start mb-10'>
                  
          <table className='w-72'>
            <tr className='mb-5'>
              <td className='text-xl font-medium mb-5'>Categories</td>
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
        Priorities
        <input className='w-80 h-1 bg-[#C9B6A9]' type='range' />
         <div className='flex flex-col gap-4 w-72   items-center text-start mt-10'>
                  
          <table className='w-72'>
            <tr className='mb-5'>
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