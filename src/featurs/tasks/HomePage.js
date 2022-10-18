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
import Sorting from '../../Assets/IconCollection/Sorting'
import Filter from '../../Assets/IconCollection/Filter'


function HomePage() {
    const dispatch = useDispatch()
    const [tasksData,settasksData]=useState('')
  
    useEffect(() => {
      
    
     
    }, [])
    
    return (
      <div className='lg:mt-2 sm:ml-4 lg:ml-14 lg:mr-12'>
      <div className='flex justify-between items-center mr-10 sm:mr-5 lg:ml-20 lg:mr-24'>
          <div className='md:ml-10'>
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>
          </div>
          <div className='flex gap-5 m-10 lg:ml-20 sm:items-center lg:w-80'>
             
                    <div
                        className=' iconbg'>
                        
                <Filter/>
                    </div>
                    <div
                        className=' iconbg'>
                <Sorting/>
              </div>
                    <div
                        className=' iconbg'>
                <SearchIcon/>
              </div>
              <div className=' iconbg bg-[#F87474] sm:ml-4 lg:ml-16 text-center md:ml-8 px-2'>
                 <AccountIcon/>
              </div>
              
              
          </div>
          
            </div>
            <div className='text-center text-3xl font-black -mt-8 sm:-ml-8 md:-ml-14'>
                Your TooDoo
            </div>
            <div className='grid text-center content-center'>
                <div className='flex flex-col m-12 items-center gap-2 '>
                
                    {/* <HomePageImage /> */}
                    {/* {<div className='text-center w-52 font-thin text-lg'>
               Get started by creating your very first task.
          </div> } */}
                    {
                     tasks.map((data ,i)=> 
                        <Task task={ data } key = {i} />
                 
                    )
                
                    }

            </div>

            </div>
            
            
            <div
                onClick={()=>dispatch(GetAllTasks())}
                className='addTask'>
                <AddTaskPlus/>
            </div>
            </div>
  )
}

export default HomePage