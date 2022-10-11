import React from 'react'
import {BiFilterAlt} from 'react-icons/bi'
import { FaSortAmountDown } from 'react-icons/fa'
import SearchIcon from '../../Assets/IconCollection/SearchIcon'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import { AiOutlinePlus } from 'react-icons/ai'
import {MdOutlineAccountCircle} from 'react-icons/md'


function HomePage() {
    return (
      <div>
      <div className='flex justify-between'>
          <div>
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>
          </div>
          <div className='flex gap-5 m-10'>
              <BiFilterAlt className='h-10 w-8 iconbg'/>
              <FaSortAmountDown className='iconbg h-10 w-8 ' />
              <div className='h-10 w-8 iconbg'>
                  <SearchIcon/>
              </div>
              <div className='h-10 w-8 iconbg bg-red-700 ml-8 lg:ml-14'>
                 <AccountIcon/>
              </div>
              
              
          </div>
          
            </div>
            <div className='text-center text-2xl font-bold'>
                Your TooDoo
            </div>
            <div>
                <AiOutlinePlus className='addTask'/>
            </div>
            </div>
  )
}

export default HomePage