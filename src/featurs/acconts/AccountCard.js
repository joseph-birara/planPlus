import React from 'react'
import {AiOutlineRight } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCurrentTasks } from '../tasks/TaskSlice'

const AccountCard = (props) => {
  const {languageChange} = useSelector(selectCurrentTasks)
  return (
      <div className='border-b-2 border-[#F9F2ED] w-80 lg:w-84 py-3 h-[58px] text-lg font-medium'>
      {props.route ? <Link to={`/${props.path}`}>
        <table className='w-[100%]'>
              <tr className='flex justify-between'>
                  <td className='flex gap-5'>
                      <img className='h-6 w-7 mt-[6px]' src={props.icon} alt='icon' />
                      
                        <span className='mt-1 ml-3 '> {props.name}</span> 
                      
                     
                  </td>
                  <td>
                       
                  </td>
                  <td className=' text-[#3AB0FF] font-black text-5xl h-10'>
                    
                        <AiOutlineRight className='h-8 w-5 text-8xl'/>
                        
                     
                  </td>
              </tr>
              
        </table></Link> :
        <table
          onClick={()=>props.handleSignout()}
          className='w-80 lg:w-84 hover:cursor-pointer'>
              <tr className='flex justify-between'>
                  <td className='flex gap-5'>
                      <img className='h-6 w-7 mt-[6px]' src={props.icon} alt='icon' />
                      
                        <span className='mt-1 ml-3'> {props.name}</span> 
                      
                     
                  </td>
                  <td>
                       
                  </td>
                  <td className=' text-[#3AB0FF] font-black '>
                    
                        <AiOutlineRight className='h-8 w-5 text-8xl'/>
                        
                     
                  </td>
              </tr>
              
          </table>}
    </div>
  )
}

export default AccountCard