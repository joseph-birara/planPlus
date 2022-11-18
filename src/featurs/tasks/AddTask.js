import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, Navigate, useNavigate } from 'react-router-dom'
import { selectCurrentUsers } from '../user/userSlice'
import { CreateTask, GetAllTasks } from './TaskActions'
import { selectCurrentTasks, empity } from './TaskSlice'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import SubTaskInsideAddTask from '../subTasks/SubTaskInsideAddTask'
import DropDown from '../components/DropDown'
import AddSubTask from '../subTasks/AddSubTask'
import ConfirmationMessage from '../components/ConfirmationMessage'
import Moment from 'react-moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import timePickerIccon from '../../Assets/IconCollection/timePicker.svg'


function AddTask() {
   const [taskDateTime,setTaskDateTime]=useState('')
    const [state, setState] = useState({
       dateTime: taskDateTime,
       status: 'Upcoming',
       note: '',
      title: '',           
    })
  //task duration handlers
  //duration swich swichs true and false
  //setvalue set changes the value in the drop down
  //
  const [durationSwitch,setDurationSwich] = useState(false)
  const swichTataDuration = () => {
    setDurationSwich(!durationSwitch)
  }
  const [taskDuration, setTaskDuration] = useState('')
  const setValuesOfSelectDuration = (someData) => {
    setTaskDuration(someData)
    
  }
  //categories handlers 
  const [taskCategory, setTaskCategory] = useState('')
  const setValuesOfSelectCategory = (someData) => {
    setTaskCategory(someData)    
  }
  const [categorySwitch,setCategorySwich] = useState(false)
  const swichTataCategory = () => {
    setCategorySwich(!categorySwitch)
  }
  
  //reminder handlers
  const [taskReminder, setTaskReminder] = useState('')
  const setValuesOfSelectReminder = (someData) => {
    setTaskReminder(someData)    
  }
  const [reminderSwitch,setReminderSwich] = useState(false)
  const swichTataRemider = () => {
    setReminderSwich(!reminderSwitch)
  }
  //priority dropdown handlers
  const [taskPriority, setTaskPriority] = useState('')
  const setValuesOfSelectPriority = (someData) => {
   setTaskPriority(someData)    
  }
  const [prioritySwitch,setPrioritySwich] = useState(false)
  const swichTataPriority = () => {
   setPrioritySwich(!prioritySwitch)
  }

  //suntaskd states
  
  // duration handler
  const [subtaskdurationSwitch,setSubTaskDurationSwich] = useState(false)
  const swichSubtaskTataDuration = () => {
    setSubTaskDurationSwich(!subtaskdurationSwitch)
  }
  const [subtaskDuration, setSubtaskTaskDuration] = useState('')
  const setValuesOfSelectSubtaskDuration = (someData) => {
    setSubtaskTaskDuration(someData)
    
  }
  
  //reminder handlers
  const [subTaskReminder, setsubTaskReminder] = useState('')
  const setValuesOfSelectSubTaskReminder = (someData) => {
    setsubTaskReminder(someData)    
  }
  const [subTaskreminderSwitch,setSubTaskReminderSwich] = useState(false)
  const swichsubTaskTataRemider = () => {
    setSubTaskReminderSwich(!subTaskreminderSwitch)
  }
  //priority dropdown handlers
  const [subTaskPriority, setsubTaskPriority] = useState('')
  const setValuesOfSelectSubTaskPriority = (someData) => {
   setsubTaskPriority(someData)    
  }
  const [subTaskprioritySwitch,setSubTaskPrioritySwich] = useState(false)
  const swichsubTaskTataPriority = () => {
   setSubTaskPrioritySwich(!subTaskprioritySwitch)
  }
  const [subdateTime,setDatetime]=useState('')
   const [subState, setsubState] = useState({
        
    duration:subtaskDuration?subtaskDuration: '30 mins',
    priority:subTaskPriority?subTaskPriority: 1,
    dateTime:'',     
    note: '',
    title: '',
    reminder:subTaskReminder?subTaskReminder: '30 mins'
    
   })
  // sub task state handlers 
  
  const [subtask, setsubtask] = useState([])
  
  const handleSubChange = (e) => {
    setsubState({ ...subState, [e.target.name]: e.target.value })
    
  }
  const userref = useRef();
  const navigate = useNavigate()
  const {taskeCreated} = useSelector(selectCurrentTasks)
  const { userToken } = useSelector(selectCurrentUsers)
  const [showSubTask,setshowSubTask]= useState(false)
  const dispatch = useDispatch()
  const [errOrSuc, seterrOrSuc] = useState(true)
  const [falseInput, setfalseInput] = useState('')
  const [showWarning, setshowWarning] = useState(false)
  
  const { title, note, dateTime } = state
  const handleChange = (e) => {
    setState({...state,[e.target.name]:e.target.value})
  }
  const setWarning = () => setshowWarning(!showWarning)
  const handleSubYes=()=>setshowSubTask(!showSubTask)
  //change subtask
  const subtaskAdder = () => {
    setsubtask(oldArray => [...oldArray, subState])
    setshowSubTask(!showSubTask)
  }
  //make the error or succes massage empity
  useEffect(() => {
    if (errOrSuc) {
      dispatch(empity())
    }
    
  
    
  }, [errOrSuc])
  
  const timeSter=()=>setTimeout(() => {
    seterrOrSuc(true)
    navigate('/')
    console.log("inside timeout");
    }, 3000);
  const modify = () => {
    seterrOrSuc(!errOrSuc)
    timeSter()
    
    
    
            }
  const handleSubmit = async() => {
    await dispatch(CreateTask(
      {
        task:
        {
          title,
          note,
          dateTime: new Date(dateTime).toISOString(),
          duration: taskDuration ? taskDuration : "30 mins",
          category: taskCategory ? taskCategory : 'Others',
          priority: taskPriority ? taskPriority[0] : 1,
          reminder: taskReminder ? taskReminder : '30 mins'
        },
        subTask: subtask,
        userToken
      }))
     .then(() => dispatch(GetAllTasks({ userToken }))).then(() => {
      modify()
     })
  }

    //focus on the input
  useEffect(() => {
        userref.current.focus();
  }, [])  
   
    
    //set and unset false inpute
  useEffect(() => {
  
    if ( new Date()> new Date(state.dateTime)) {
     setfalseInput("invalid starting time ")
    }
    else {
      setfalseInput("")
    }
   
  }, [state.dateTime])
 console.log(state);
  
  if (showSubTask) {
    return (
      <div className=''>
      {
        showWarning?<ConfirmationMessage setWarning ={setWarning} item ={'Are you sure you want to cancel this subtask?'} handleYes={handleSubYes} pathProp={'addtask'}/>:''
      }
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw />
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
          Add a subtask
        </div>
          <div
            onClick={()=>setshowWarning(!showWarning)}
            className='text-[#F87474] mr-6'>
          Cancel

        </div>
        
    </div>

      </div>
      
      
      <div className='flex flex-col items-center text-start'>
        <form className='flex flex-col gap-4 w-72 m-10 mt-5 items-center '>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >subtask title</label>
            <div className='relative'>
              <input
                 maxLength={32}
                 ref = {userref}
                  required
                  value={subState.title}
                 onChange={handleSubChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="eg. Finish  market presentation "
          className="bigInputBox"
          
              />
               <div className='h-4 w-4 absolute top-2 right-2 text-center mr-3 text-sm'>
              {
                subState.title.length+"/"+32
              }
            </div>

            </div>
           
         

          </div>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >Date & time</label>
             <DatePicker
                selected={subdateTime}
                value={subdateTime}

                 
             
              
                  
          onChange={date=>setsubState({...subState,dateTime:date})}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                 placeholderText="eg. 10:00AM;20/10/2022 "
                
                minDate={new Date(state.dateTime)}
                showYearDropdown
            scrollableYearDropdown
            showTimeSelect={true}
            dropdownMode={'select'}
            controls={['calendar']}
                className="bigInputBox"
                customInput={<div className='bigInputBox flex justify-between'>
                {
                 subState.dateTime?subState.dateTime.toString().slice(4,21): "eg. 10:00AM;20/10/2022 "
                }
                <img className='w-4' src={timePickerIccon} alt='time' /></div>}
          
          
        />
              
          </div>
          <div className='flex justify-between gap-5'>
            <div>
              <label className='flex items-start text-start  font-bold mb-1 ' >Duration</label>
              <DropDown
                place='eg. 2hrs'
                swichTata={swichSubtaskTataDuration}
                tata={subtaskdurationSwitch}
                realValue={subtaskDuration}
                setValuesOfSelect={setValuesOfSelectSubtaskDuration}
                data={["15 mins", "30 mins", "1 hrs", "2 hrs", "6 hrs", "12 hrs"]}
               
        />
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Reminder</label>
               <DropDown        
                place='eg.30 mins'
                swichTata={swichsubTaskTataRemider}
                tata={subTaskreminderSwitch}
                realValue={subTaskReminder}
                setValuesOfSelect={setValuesOfSelectSubTaskReminder}
                data={["15 mins", "30 mins", "1 hrs", "2 hrs"]}
               
        />    
            </div>
           
        
        

          </div>
          <div >
            
            <div className='-ml-40'>
              <label className='flex items-start text-start  font-bold mb-1' >Priority</label>
               
        <DropDown        
         
                place='eg.1-very low'
                swichTata={swichsubTaskTataPriority}
                tata={subTaskprioritySwitch}
                realValue={subTaskPriority}
                setValuesOfSelect={setValuesOfSelectSubTaskPriority}
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
                  value={subState.note}
                 onChange={handleSubChange}
                  type="text"
                  name="note"
                  id="note"
                  placeholder="eg. This is a high priority task that needs to be done right to avoid any delays"
          className="bigInputBox h-32 "
          
        />
         <div className='h-4 w-4 absolute top-24 right-3 text-center mr-3 text-sm'>
              {
                subState.note.length+"/"+128
              }
            </div>

          </div>
          </div>
          
        
        
        
      
          <span className='flex gap-6 justify-between'>
             
        <button
          
                  onClick={subtaskAdder}
                  
                   disabled = { !subState.dateTime || !subState.title}
                
                  type="button" className=" btn">
                  Save subtask</button>
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
    )
  }

  return (
    
    <div className=''>
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
          Add a new task
        </div>
        <div className='text-[#F87474] mr-6'>
          Cancel

        </div>
        
    </div>

      </div>
      
      {
        taskeCreated?<div className='errorMessag' >{taskeCreated}</div>:''
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
            
      <  DatePicker
                selected={taskDateTime}
                value={taskDateTime}                
             
              
                  
          onChange={date=>setState({...state,dateTime:date})}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                 placeholderText="eg. 10:00AM;20/10/2022 "
                
                minDate={new Date()}
                showYearDropdown
            scrollableYearDropdown
            showTimeSelect={true}
            dropdownMode={'select'}
            controls={['calendar']}
              className="bigInputBox"
              customInput={<div className='bigInputBox flex justify-between'>
                {
                 state.dateTime?state.dateTime.toString().slice(4,21): "eg. 10:00AM;20/10/2022 "
                }
                <img className='w-4' src={timePickerIccon} alt='time' /></div>}
          
        />
          </div>
          <div className='flex justify-between gap-5 '>
            <div>
              <label className='flex items-start text-start  font-bold mb-1 ' >Duration</label>
              
              <DropDown
          
         
                place='eg. 2hrs'
                swichTata={swichTataDuration}
                tata={durationSwitch}
                realValue={taskDuration}
                setValuesOfSelect={setValuesOfSelectDuration}
                data={["15 mins", "30 mins", "1 hrs", "2 hrs", "6 hrs", "12 hrs"]}
               
        />
          
           

            
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Reminder</label>
               <DropDown
          
         
                place='eg.30 mins'
                swichTata={swichTataRemider}
                tata={reminderSwitch}
                realValue={taskReminder}
                setValuesOfSelect={setValuesOfSelectReminder}
                data={["15 mins", "30 mins", "1 hrs", "2 hrs"]}
               
        />              
              
          
        
            </div>
           
        
        

          </div>
          <div className='flex justify-between gap-5 '>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Category</label>
              <DropDown
          
         
                place='eg.Work'
                swichTata={swichTataCategory}
                tata={categorySwitch}
                realValue={taskCategory}
                setValuesOfSelect={setValuesOfSelectCategory}
                data={["Others", "Family", "Work", "Education","Shopping"]}
               
        /> 
          
         

            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Priority</label>
               
       <DropDown        
         
                place='eg.5-very high'
                swichTata={swichTataPriority}
                tata={prioritySwitch}
                realValue={taskPriority}
                setValuesOfSelect={setValuesOfSelectPriority}
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
          {subtask && subtask.length>0?<div>
            <label className='flex items-start text-start  font-bold mb-1' >Subtasks</label>
            {
              subtask.map((sub,index)=> <SubTaskInsideAddTask subTask={sub } index={index+1} />)
            }
           
          </div>:''}
         
          
        
        
        
      
          <span className='flex gap-6 justify-between'>
             <button
          
                   onClick={()=>setshowSubTask(!showSubTask)}
                  
                  
                  disabled = {falseInput || !state.dateTime ||  !state.title}
                  type="button" className=" subtaskBtn ">
                 add subtask</button>
        <button
          
                  // onClick={this.onSubmitSignin}
                  
                   disabled = {falseInput || !state.dateTime  || !state.title}
                 onClick={handleSubmit}
                  type="button" className=" btn">
                  Save Task</button>
        </span>
       
        
      </form>

      </div>
      
      {/* {
        taskeCreated ? <div className='errorMessag text-gray-600'>
          { alert(taskeCreated)}
        </div>:''
      } */}
       
        {/* {
        falseInput ? <div className='errorMessag'>
         { falseInput}
        </div>:''
      }
       */}
    
    </div>
  )
}

export default AddTask