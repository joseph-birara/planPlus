import React from 'react'
import {FaGreaterThan } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AccountCard = (props) => {
  return (
      <div className='border-b-2 border-[#F9F2ED] w-80 lg:w-84 py-3 h-16 text-lg font-medium'>
      {props.route ? <Link to={`/${props.path}`}>
        <table className='w-[100%]'>
              <tr className='flex justify-between'>
                  <td className='flex gap-5'>
                      <img className='h-6 w-7 mt-[6px]' src={props.icon} alt='icon' />
                      
                        <span className='mt-1 ml-3 '> {props.name}</span> 
                      
                     
                  </td>
                  <td>
                       
                  </td>
                  <td className='mt-2 text-[#3AB0FF]'>
                    
                        <FaGreaterThan className='h-4'/>
                        
                     
                  </td>
              </tr>
              
        </table></Link> :
        <table
          onClick={()=>props.handleSignout()}
          className='w-80 lg:w-84'>
              <tr className='flex justify-between'>
                  <td className='flex gap-5'>
                      <img className='h-6 w-7 mt-[6px]' src={props.icon} alt='icon' />
                      
                        <span className='mt-1 ml-3'> {props.name}</span> 
                      
                     
                  </td>
                  <td>
                       
                  </td>
                  <td className='mt-2 text-[#3AB0FF]'>
                    
                        <FaGreaterThan className='h-4'/>
                        
                     
                  </td>
              </tr>
              
          </table>}
    </div>
  )
}

export default AccountCard