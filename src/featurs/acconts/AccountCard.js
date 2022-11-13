import React from 'react'
import {FaGreaterThan } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AccountCard = (props) => {
  return (
      <div className='border-b-2 border-[#F9F2ED] w-80 py-2'>
          <table className='w-80'>
              <tr className='flex justify-between'>
                  <td className='flex gap-5'>
                      <img src={props.icon} alt='icon' />
                      
                        <span className='mt-1 '> {props.name}</span> 
                      
                     
                  </td>
                  <td>
                       
                  </td>
                  <td className='mt-2 text-[#3AB0FF]'>
                     {props.route? <Link to={`/${props.path}`}>
                        <FaGreaterThan/>
                      </Link> : <FaGreaterThan
                              onClick={()=>props.handleSignout()}
                      /> 
                     }
                  </td>
              </tr>
              
          </table>
    </div>
  )
}

export default AccountCard