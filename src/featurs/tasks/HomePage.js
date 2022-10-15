import React from 'react'
import {BiFilterAlt} from 'react-icons/bi'
import { FaSortAmountDown } from 'react-icons/fa'
import SearchIcon from '../../Assets/IconCollection/SearchIcon'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import { AiOutlinePlus } from 'react-icons/ai'
import {MdOutlineAccountCircle} from 'react-icons/md'
import Task from './Task'

function HomePage() {
    return (
      <div>
      <div className='flex justify-between'>
          <div>
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>
          </div>
          <div className='flex gap-5 m-10'>
              <BiFilterAlt className='iconbg'/>
              <FaSortAmountDown className='iconbg' />
              <div className=' iconbg'>
                  <SearchIcon/>
              </div>
              <div className=' iconbg bg-red-700 ml-8 lg:ml-16 text-center'>
                 <AccountIcon/>
              </div>
              
              
          </div>
          
            </div>
            <div className='text-center text-2xl font-bold m-0'>
                Your TooDoo
            </div>
            <div className='grid text-center content-center'>
                <div className='flex flex-col m-12 items-center gap-2 '>
                <Task/>
                <Task />
                <Task />
                 <Task/>

            </div>

            </div>
            
            
            <div>
                <AiOutlinePlus className='addTask'/>
            </div>
            </div>
  )
}

export default HomePage