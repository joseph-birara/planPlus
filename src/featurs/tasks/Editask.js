import React, {  useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import { selectCurrentUsers } from '../user/userSlice'
import { GetAllTasks, UpdateData } from './TaskActions'
import { selectCurrentTasks, taskEditMessage } from './TaskSlice'
import SubTaskInsideAddTask from '../subTasks/SubTaskInsideAddTask'
import DropDown from '../components/DropDown'



function Editask() { 
  const location = useLocation()
  const [task, settask] = useState(location.state.detail)
  
    
  const dispatch = useDispatch()
  const { userToken } = useSelector(selectCurrentUsers)
  const { taskEdited } = useSelector(selectCurrentTasks)
  const [falseInput,setfalseInput]=useState('')
  const [errOrSuc, seterrOrSuc] = useState(true)
  const userref = useRef();
  const navigate = useNavigate()
  const [nochange,setnochange]=useState(true)
  

    
    
    const [state, setState] = useState({
        category: task.category,
        duration:task.duration,
        priority:task.priority,
       dateTime: new Date(new Date(task.dateTime).getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)  ,                           
      status: task.status,
      note:task.note,
      title: task.title,
      reminder:task.reminder
        
        
        
    })
  useEffect(() => {
  //  setnochange(false)
  }, [state])
  
  const state_duration_Updater=(someValue) => {
    setState({ ...state, duration: someValue })
    setnochange(false)
  }
  const state_priority_Updater=(someValue) => {
    setState({ ...state, priority: someValue })
    setnochange(false)
  }
  const state_category_Updater=(someValue) => {
    setState({ ...state, category: someValue })
    setnochange(false)
  }
  const state_reminder_Updater=(someValue) => {
    setState({ ...state, reminder: someValue })
    setnochange(false)
                }
  
  //state to to swich drop down
  const [swichersFortaskEdit, setswichersFortaskEdit] = useState({
    taskReminder: false,
    taskPriority: false,
    taskDuration: false,
    taskCatagory:false
    
  })
  const switchDuration = () => {
    setswichersFortaskEdit({...swichersFortaskEdit,taskDuration:!swichersFortaskEdit.taskDuration})
  }
  const switchPriority = () => {
    setswichersFortaskEdit({...swichersFortaskEdit,taskPriority:!swichersFortaskEdit.taskPriority})
  }
  const switchReminder = () => {
    setswichersFortaskEdit({...swichersFortaskEdit,taskReminder:!swichersFortaskEdit.taskReminder})
  }
  const switchCatagory = () => {
    setswichersFortaskEdit({...swichersFortaskEdit,taskCatagory:!swichersFortaskEdit.taskCatagory})
  }
  //error or suscces message managment
  useEffect(() => {
    if (errOrSuc) {
      dispatch(taskEditMessage(taskEdited))
    }
    
  
    
  }, [errOrSuc,dispatch,taskEdited])

  const timeSter=()=>setTimeout(() => {
    seterrOrSuc(true)
    console.log("inside timeout");
    }, 3000);
  const modify = () => {
    seterrOrSuc(!errOrSuc)
    timeSter()
    
    
    
  }
  //set and unset false inpute
  useEffect(() => {
  
    if ( new Date()> new Date(state.dateTime)) {
     setfalseInput("invalid starting time ")
    }
    else {
      setfalseInput("")
    }
   
  }, [state.dateTime])
  //focus on the input
  useEffect(() => {
        userref.current.focus();
    }, [])

  const { title, note, dateTime, duration, category, priority, reminder, status } = state
  //changes state when inpute change
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    setnochange(false)
    
  }
  const handleSubmit = async() => {
    await dispatch(UpdateData({ _id: task._id, title, note, dateTime, duration, category, priority:priority[0], reminder, status, userToken }))
      .then(() => {
        dispatch(GetAllTasks({ userToken }))
        modify()
       

      })
      console.log(task._id);
      
  }
    
   if(task._id) 
  {return (
    
    <div className=''>
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
         Update a task
        </div>
           <div className='text-[#F87474] mr-6'>
             <Link to={location.state.url}>
                Cancel
             </Link>
         

        </div>
        
    </div>

      </div>
      
      {
        taskEdited?<div className='errorMessag' >{taskEdited}</div>:''
      }
      <div className='flex flex-col items-center text-start'>
        <form className='flex flex-col gap-4 w-72 m-10 mt-5 items-center '>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >Task title</label>
            <div className='relative'>
              <input
                 maxLength={32}
                 ref = {userref}
                  required
                  value={state.title}
                 onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="eg. Finish market presentation "
          className="bigInputBox"
          
              />
               <div className='h-4 w-4 absolute top-2 right-2 text-center mr-3 text-sm'>
              {
                state.title.length+"/"+32
              }
            </div>

            </div>
           
         

          </div>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >Date & time</label>
            
        <input
                 
              required
              
                  value={state.dateTime}
          onChange={handleChange}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                  placeholder="eg. 10:00AM;20/10/2022 "
          className="bigInputBox"
          
        />
          </div>
          <div className='flex justify-between gap-5 '>
            <div>
              <label className='flex items-start text-start  font-bold mb-1 ' >Duration</label>
              <DropDown
          
         
                place='eg. 2hrs'
                swichTata={ switchDuration}
                tata={swichersFortaskEdit.taskDuration}
                realValue={state.duration}
                 setValuesOfSelect={state_duration_Updater}
                data={["15 mins", "30 mins", "1 hrs", "2 hrs", "6 hrs", "12 hrs"]}
               
        />
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Reminder</label>
              <DropDown
          
         
                place='eg.30 mins'
                swichTata={switchReminder}
                tata={swichersFortaskEdit.taskReminder}
                realValue={state.reminder}
                setValuesOfSelect={state_reminder_Updater}
                data={["15 mins", "30 mins", "1 hrs", "2 hrs"]}
               
        />              
             
            </div>
           
        
        

          </div>
          <div className='flex justify-between gap-5 '>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Category</label>
             <DropDown
          
         
                place='eg.Work'
                swichTata={switchCatagory}
                tata={swichersFortaskEdit.taskCatagory}
                realValue={state.category}
                setValuesOfSelect={state_category_Updater}
                data={["Others", "Family", "Work", "Education","Shopping"]}
               
        /> 

            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Priority</label>
               
        <DropDown        
         
                place='eg.1-very low'
                swichTata={switchPriority}
                tata={swichersFortaskEdit.taskPriority}
                realValue={state.priority}
                setValuesOfSelect={state_priority_Updater}
                data={["1-very low", "2-low", "3-midium", "4-high","5-very high"]}
               
        /> 
        

            </div>
            
          </div>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >Note</label>
            <div className='relative'>
            <textarea
                 maxLength={128}
                  required
                  value={state.note}
                 onChange={handleChange}
                  type="text"
                  name="note"
                  id="note"
                  placeholder="eg. This is a high priority task that needs to be done right to avoid any delays"
          className="bigInputBox h-32 "
          
        />
         <div className='h-4 w-4 absolute top-24 right-3 text-center mr-3 text-sm'>
              {
                state.note.length+"/"+128
              }
            </div>

          </div>
           </div>
           {task.subTask ?<div>
            <label className='flex items-start text-start  font-bold mb-1' >Subtasks</label>
            {task.subTask.map((sub,index)=><SubTaskInsideAddTask subTask={sub } index={index+1} />)}
          </div>:''}
         
         
          
        
        
        
      
           <span className='flex gap-6 justify-between'>
             <Link to={location.state.url} state={{
               detail: state
             }}
             >
               <button
          
                  // onClick={this.onSubmitSignin}
                  
                   disabled = {nochange}
                 onClick={handleSubmit}
                  type="button" className=" btn">
                  Update task</button>
             </Link>
        
        </span>
       
        
      </form>

      </div>
      
      {/* {
        taskeCreated ? <div className='errorMessag text-gray-600'>
          { alert(taskeCreated)}
        </div>:''
      } */}
       
        {
        falseInput ? <div className='errorMessag'>
         { falseInput}
        </div>:''
      }
      
    
    </div>
  )}
}

export default Editask