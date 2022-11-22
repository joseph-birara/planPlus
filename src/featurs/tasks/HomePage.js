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

import translate from '../../Assets/translationLanguga';

function HomePage() {
    const {languageChange} = useSelector(selectCurrentTasks)
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
      <div className=' w-screen  mt-4 overflow-x-hidden h-screen'>
      <div className='m-0 flex justify-between mr-2 md:mr-12 lg:ml-[120px] lg:mr-20 items-start lg:mt-5'>
                <div className='-ml-3 md:ml-4 lg:ml-10'>
                   
             {!showSearch?       
              <img className='homeLogo' src={TooDoo_logo} alt = 'logo'/>:''}
          </div>
          <div className='flex gap-3 m-10  sm:items-center lg:w-80 mt-6 '>
             
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
                    <div className={`flex flex-col gap-1 -mb-[57px] ${showSearch?'ml-[135px] md:ml-[150px lg:ml-[150px]':''} `}>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
                            className=' iconbg bg-[#F87474] ml-4 lg:ml-14 text-center md:ml-8 px-[5px]  md:px-2 lg:px-2'>
                            <Link to='/notify'>
                                 <NotificationIcone />
                            </Link>
                        
                
                        </div>
                        <div
                        // onClick={() => setlogedIn(!logedIn)}
                        className=' iconbg bg-[#F87474] ml-4 lg:ml-14 text-center md:ml-8 px-[4px] pt-[13px] md:px-[7px]'>
                            <Link to='/account'  >
                                <AccountIcon />
                            </Link>  
                
              </div>

                    </div>
                    
              
              
          </div>
          
            </div>
             {showSearch ?
                <form className='absolute top-[14px] left-[0%] md:left-[15%] lg:left-[20%] lg:top-[20px]'>
                    <div className='flex '>
 <div className='relative'>
                            <input
                 
                  required
                  value={search}
                   type='search'
                  name="email"
                  id="email"
                  placeholder={languageChange?translate.searchHere.eng:translate.searchHere.tg}
                            className="inputBox mt-5 rounded-[42px] w-[230px] lg:w-[390px] h-[45px] mg:h-[50px] lg:h-[50px] ml-1 md:ml-10 lg:ml-80 pl-[51px] text-lg placeholder:text-xl placeholder:font-thin placeholder:text-[#575757]"
                            onChange={(e)=>setsearch(e.target.value)}
                  
                            />
                            <div className='absolute top-[6px] md:top-[7px] lg:top-[8px] '>
                            <SmallSearchIcon  />
                        </div> 

                        </div>
                        <div
                            onClick={() => {
                                setsearch('')
                                setshowSearch(false)
                            }}
                            className='text-[#F87474] mt-6 ml-2 text-xl lg:ml-6 hover:cursor-pointer lg:text-2xl '>
                             {
                    languageChange?translate.cancel.eng:translate.cancel.tg
               }
                        </div>
                    </div>
                       
                        
                    </form>:''}
            <div className='text-center text-3xl font-black  -ml-56 md:-ml-14 lg:-ml-14'>
                {
                    languageChange?translate.yourTodo.eng:translate.yourTodo.tg
               }
            </div>
            <div className='flex justify-center text-center content-center mt-9'>
                <div className='flex  flex-col m-12 mt-3 items-center gap-2 '>
                    
                    
                    
                    {allTasks && allTasks.length>0?
                      filterdTasks &&filterdTasks.length>0?
                         filterdTasks.map((data ,i)=> 
                        <Task  task={ data } key = {i} />
                 
                    )
                            :<div className='text-center w-56 font-thin text-xl -ml-10 text-gray-500'>
                                {
                                    languageChange?translate.noTasks.eng:translate.noTasks.tg
              }
          </div>:  <div>
                                <HomePageImage />
                    <div className='text-center w-56 font-thin text-xl -ml-14 text-gray-500'>
                                {
                                    languageChange?translate.firstTask.eng:translate.firstTask.tg
               }
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