import React, { useState,useEffect} from 'react'


import SearchIcon from '../../Assets/IconCollection/SearchIcon'
import AccountIcon from '../../Assets/IconCollection/AccountIcon'
import TooDoo_logo from '../../TooDoo Logo/TooDoo_logo.png'
import Task from './Task'
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTasks } from './TaskSlice'
import { GetAllTasks, UpdateStatus, UpdateSubTaskStatus } from './TaskActions'

import HomePageImage from '../../Assets/IconCollection/HomePageImage'
import AddTaskPlus from '../../Assets/IconCollection/AddTaskPlus'
import Sorting from '../../Assets/IconCollection/Sorting'
import Filter from '../../Assets/IconCollection/Filter'
import { selectCurrentUsers } from '../user/userSlice'
import { calculatore } from './Calculatore'
import { pushAndSubscribe } from '../../Clinet'
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner'
import LogOut from '../user/LogOut'
import { Link, useLocation } from 'react-router-dom'
import NotificationIcone from '../../Assets/IconCollection/NotificationIcone'
import SmallSearchIcon from '../../Assets/IconCollection/SmallSearchIcon'

function HomePage() {
    const dispatch = useDispatch()
    // const [tasksData, settasksData] = useState('')
    const { allTasks } = useSelector(selectCurrentTasks)
    const { userToken } = useSelector(selectCurrentUsers)
    const [search, setsearch] = useState('')
    const [showSearch, setshowSearch]=useState(false)
    const { loading } = useSelector(selectCurrentTasks)
    const [logedIn, setlogedIn] = useState(false)
    const location = useLocation()
    
    
    let filterdTasks = ''
   
    
    //change to overdue or inprogress
    const changeHandler = async(_id,nextStatus) => {
   await  dispatch(UpdateStatus({ _id:_id,status:nextStatus, userToken:userToken})).then
    (()=>dispatch(GetAllTasks({userToken:userToken})))
    }
    const changeHandlerSubTask = async(_id,nextStatus) => {
   await  dispatch(UpdateSubTaskStatus({ _id:_id,status:nextStatus, userToken:userToken})).then
    (()=>dispatch(GetAllTasks({userToken:userToken})))
    }
    useEffect(() => {
        console.log("calculatore is called once");
        const timer2 = setInterval(() => {
            if (allTasks && allTasks.length > 0) {
                allTasks.forEach(task => calculatore({
                task: task,
                changeHandler:changeHandler
            })

        
    );
            }
            if (allTasks && allTasks.length > 0) {
               allTasks.map(t => t.subTask?.map(sub => calculatore({
                task: sub,
                changeHandler:changeHandlerSubTask
                
         })))  
            }
              
        }, 10000);
        return ()=>clearInterval(timer2)
      
    
      
    }, [allTasks])
    
  
    useEffect(() => {
        

       
       dispatch(GetAllTasks({ userToken }))
        //pushAndSubscribe({userToken:userToken})
      
            
    }, [userToken])

//for searching 
    if (allTasks) {
        
        filterdTasks =  allTasks.filter(monster => monster.title.toLowerCase().includes(search.toLowerCase()));
         
    }
//for filter
    if (location && location.state  && location.state.url === 'filter') {
        console.log("filtering , by ");
        console.log("befor", filterdTasks);
        if (location.state.category) {
            filterdTasks = filterdTasks.filter(x => x.category === location.state.category) 
        }
        if (location.state.status) {
            filterdTasks = filterdTasks.filter(x => x.status === location.state.status) 
        }
        if (location.state.minValue &&location.state.maxValue) {
            filterdTasks = filterdTasks.filter(x => x.priority >=location.state.minValue && x.priority<=location.state.maxValue) 
        }
        
        
        console.log("afterr",filterdTasks);

            
    }
    if (location && location.state && location.state.url === 'sort' && location.state.fromLower) {
        console.log(location,"from lower");
        filterdTasks = filterdTasks.sort((a, b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0))
        filterdTasks.map(sub=>sub.subTask.sort((a, b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0)))

    }
    if (location && location.state && location.state.url === 'sort' && location.state.fromhigher) {
        console.log(location,"from higher");
        filterdTasks = filterdTasks.sort((a, b) => (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0))
        filterdTasks.map(sub=>sub.subTask.sort((a, b) => (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0)))

     }


          

    if (loading) {
        return(< LoadingSpiner/>)
       
    }
    
    return (
      <div className=' mt-5 lg:mt-1  lg:ml-10 lg:mr-12 overflow-hidden'>
      <div className='flex justify-between mr-10 sm:mr-5 lg:ml-20 lg:mr-20 items-start'>
                <div className='md:ml-10'>
                    {showSearch?<form className='flex flex-row'>
                        <div className='relative'>
                            <input
                 
                  required
                  value={search}
                   type='search'
                  name="email"
                  id="email"
                  placeholder="Search your list... "
                            className="inputBox mt-5 rounded-[42px] w-[250px] lg:w-[350px] h-[37px] ml-10 lg:ml-80 pl-11"
                            onChange={(e)=>setsearch(e.target.value)}
                  
                            />
                            <div className='absolute top-[3px]'>
                            <SmallSearchIcon  />
                        </div> 

                        </div>
                        <div
                            onClick={() => {
                                setsearch('')
                                setshowSearch(false)
                            }}
                            className='text-[#F87474] mt-6 ml-2 text-xl lg:ml-5 hover:cursor-pointer'>
                            Cancel
                        </div>
                        
                    </form>:''}
             {!showSearch?       
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>:''}
          </div>
          <div className='flex  -mr-3 gap-3 m-10 lg:ml-28 sm:items-center lg:w-80 mt-8 '>
             
                    {!showSearch?<div
                        
                        className=' iconbg'>
                        
<Link to ='/filter'><Filter/></Link>
                    </div>:""}
                    {!showSearch?<div
                        className=' iconbg'>
              <Link to='/sort' ><Sorting/></Link> 
              </div>:''}
                    {!showSearch?<div
                        onClick={()=>setshowSearch(!showSearch)}
                        className=' iconbg'>
                <SearchIcon/>
                    </div>:''}
                    <div className='flex flex-col gap-1 -mb-10'>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
                            className=' iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-2'>
                            <Link to='/notify'>
                                 <NotificationIcone/>
                            </Link>
                        
                
                        </div>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
                        className=' iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-2'>
                            <Link to='/account'  >
                                <AccountIcon />
                            </Link>  
                
              </div>

                    </div>
                    
              
              
          </div>
          
            </div>
            <div className='text-center text-3xl font-black -mt-12 ml-0'>
                Your TooDoo
            </div>
            <div className='flex justify-center text-center content-center mt-4'>
                <div className='flex  flex-col m-12 mt-3 items-center gap-2 '>
                    
                    
                    
                    {allTasks && allTasks.length>0?
                      filterdTasks &&filterdTasks.length>0?
                         filterdTasks.map((data ,i)=> 
                        <Task  task={ data } key = {i} />
                 
                    )
                            :<div className='text-center w-56 font-thin text-xl -ml-10 text-gray-500'>
               No tasks found with your filter
          </div>:  <div>
                                <HomePageImage />
                    <div className='text-center w-56 font-thin text-xl -ml-10 text-gray-500'>
               Get started by creating your very first task.
          </div> 
                        
                </div>
                    
                
                    }

            </div>

            </div>
            
            
            <div
                 
                className='addTask'>
                <AddTaskPlus/>
            </div>
            </div>
  )
}

export default HomePage