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

function HomePage() {
    const dispatch = useDispatch()
    // const [tasksData, settasksData] = useState('')
    const { allTasks } = useSelector(selectCurrentTasks)
    const { userToken } = useSelector(selectCurrentUsers)
    const [search, setsearch] = useState('')
    const { loading } = useSelector(selectCurrentTasks)
    const [logedIn,setlogedIn]= useState(true)
    
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
            allTasks?.forEach(task => calculatore({
                task: task,
                changeHandler:changeHandler
            })

        
    );
            allTasks?.map(t => t.subTask?.map(sub => calculatore({
                task: sub,
                changeHandler:changeHandlerSubTask
                
         })))   
        }, 10000);
        return ()=>clearInterval(timer2)
      
    
      
    }, [allTasks])
    
  
    useEffect(() => {
        

       
       // dispatch(GetAllTasks({ userToken }))
        //pushAndSubscribe({userToken:userToken})
      
            
    }, [userToken])


    if (allTasks) {
        
        filterdTasks =  allTasks.filter(monster => monster.title.toLowerCase().includes(search.toLowerCase()));
         
     }
          

    if (loading) {
        return(< LoadingSpiner/>)
       
    }
    
    return (
      <div className='  lg:mt-1  lg:ml-10 lg:mr-12 overflow-hidden'>
      <div className='flex flex-auto justify-between items-center mr-10 sm:mr-5 lg:ml-20 lg:mr-24'>
                <div className='md:ml-10'>
                   {/* { <form>
                        <input
                 
                  required
                  value={search}
                   type='text'
                  name="email"
                  id="email"
                  placeholder="search here "
                  className="inputBox"
                  
        />
                    </form>} */}
                    {
                        logedIn?<LogOut/>:''
                    }
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>
          </div>
          <div className='flex  -mr-3 gap-3 m-10 lg:ml-24 sm:items-center lg:w-80 mt-8 '>
             
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
                    <div onClick={()=>setlogedIn(!logedIn)}
                        className=' iconbg bg-[#F87474] sm:ml-4 lg:ml-14 text-center md:ml-8 px-2'>
                 <AccountIcon/>
              </div>
              
              
          </div>
          
            </div>
            <div className='text-center text-2xl font-black -mt-12 ml-0 sm:-ml-14'>
                Your TooDoo
            </div>
            <div className='flex justify-center text-center content-center mt-4'>
                <div className='flex  flex-col m-12 mt-3 items-center gap-2 '>
                    
                    
                    
                    {
                      filterdTasks &&filterdTasks.length>0?
                         filterdTasks.map((data ,i)=> 
                        <Task  task={ data } key = {i} />
                 
                    )
                            : <div>
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