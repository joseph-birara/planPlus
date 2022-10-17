import React, { useState,useEffect} from 'react'
import {BiFilterAlt} from 'react-icons/bi'
import { FaSortAmountDown } from 'react-icons/fa'
import SearchIcon from '../../Assets/IconCollection/SearchIcon'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import {MdOutlineAccountCircle} from 'react-icons/md'
import Task from './Task'
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTasks } from './TaskSlice'
import { GetAllTasks } from './TaskActions'
import axios from 'axios'
import tasks from './tasks'
import HomePageImage from '../../Assets/IconCollection/HomePageImage'
import AddTaskPlus from '../../Assets/IconCollection/AddTaskPlus'


function HomePage() {
    const dispatch = useDispatch()
  
    
    return (
      <div className='lg:mt-10 sm:ml-4 lg:ml-14 lg:mr-12'>
      <div className='flex justify-between items-center mr-10 sm:mr-5 lg:ml-24 lg:mr-24'>
          <div className='md:ml-10'>
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>
          </div>
          <div className='flex gap-5 m-10 lg:ml-20 sm:items-center lg:w-80'>
              <BiFilterAlt className='iconbg'/>
              <FaSortAmountDown className='iconbg' />
              <div className=' iconbg'>
                <SearchIcon/>
              </div>
              <div className=' iconbg bg-[#F87474] sm:ml-4 lg:ml-16 text-center md:ml-8'>
                 <AccountIcon/>
              </div>
              
              
          </div>
          
            </div>
            <div className='text-center text-2xl font-black -mt-6 sm:-ml-8 md:-ml-14'>
                Your TooDoo
            </div>
            <div className='grid text-center content-center'>
                <div className='flex flex-col m-12 items-center gap-2 '>
                
                    <HomePageImage />
                    <div className='text-center w-52 font-thin text-lg'>
               Get started by creating your very first task.
          </div> 
                    {/* {
                     tasks.map((data ,i)=> 
                        <Task task={ data } key = {i} />
                 
                    )
                
                    } */}

            </div>

            </div>
            
            
            <div className='fixed lg:right-52 bottom-24'>
                <AddTaskPlus/>
            </div>
            </div>
  )
}

export default HomePage