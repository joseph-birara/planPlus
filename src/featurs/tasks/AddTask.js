import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Link, Navigate, useNavigate } from 'react-router-dom'
import { selectCurrentUsers } from '../user/userSlice'
import { CreateTask, GetAllTasks } from './TaskActions'
import { selectCurrentTasks, empity } from './TaskSlice'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import SubTaskInsideAddTask from '../subTasks/SubTaskInsideAddTask'
import SelectDropDown from '../components/SelectDropDown'
import AddSubTask from '../subTasks/AddSubTask'
import ConfirmationMessage from '../components/ConfirmationMessage'


function AddTask() {
    const [state, setState] = useState({
        catagory: 'Others',
        duration: '30 mins',
        priority: '1',
      dateTime: new Date(),
      status: 'Upcoming',
      note: '',
      title: '',
      reminder: '30 mins',
           
    })
   const [subState, setsubState] = useState({
        
    duration: '30 mins',
    priority: 1,
    dateTime: new Date(),     
    note: '',
    title: '',
    reminder:'30 mins'
        
        
        
   })
  const [subtask,setsubtask]=useState([])
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
  const [showWarning,setshowWarning]=useState(false)
  
  const { title, note, dateTime, duration, category, priority, reminder } = state
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
   await dispatch(CreateTask({ task:{title, note, dateTime:new Date(dateTime).toISOString(), duration, category, priority:priority[0], reminder},subTask:subtask, userToken }))
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
  if (showSubTask) {
    return (
      <div className=''>
      {
        showWarning?<ConfirmationMessage setWarning ={setWarning} item ={'Are you sure you want to cancel this subtask?'} handleYes={handleSubYes} />:''
      }
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-8/12 h-11 justify-between items-center p-2 '>
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
                  placeholder="eg. Finish market presentation "
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
            
        <input
                 
              required
              
                  value={subState.dateTime}
          onChange={handleSubChange}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                  placeholder="eg. 10:00AM;20/10/2022 "
          className="bigInputBox"
          
        />
          </div>
          <div className='flex justify-between gap-5'>
            <div>
              <label className='flex items-start text-start  font-bold mb-1 ' >Duration</label>
              <select
          required
         
          onChange={handleSubChange}
          name="duration"
              id="duration"
                className='bigInputBox w-[150px] pl-2'
                placeholder='eg.2hrs'
        >
          
          
          <option>
            15 mins
          </option>
          <option>
            30 mins
          </option>
           
           <option>
            1 hrs
          </option>
           <option>
            2 hrs
          </option>
           <option>
            6 hrs
          </option>
           <option>
            12 hrs
          </option>

            </select>
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Reminder</label>
               <select
          name='reminder'
              onChange={handleSubChange}
                className='bigInputBox w-[150px] pl-2'
                placeholder='eg.30mins'
              >
                
              
          
          <option >
            15 mins
          </option>
          <option>
            30 mins
          </option>         
          
          <option>
            1 hrs
          </option>
          <option>
           2 hrs
          </option>
        </select>
            </div>
           
        
        

          </div>
          <div >
            
            <div className='-ml-40'>
              <label className='flex items-start text-start  font-bold mb-1' >Priority</label>
               
        <select
                name='priority'
                className='bigInputBox w-[150px] pl-2'
          onChange={handleSubChange}>
          

          <option>
            1-Very low
          </option>

          <option >
            2-Low
          </option>
          
          <option>
            3-Midium
          </option>
          <option>
           4-High
          </option>
          <option>
            5-Very high
          </option>
        </select>
        

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
                  
                   disabled = {falseInput || !subState.dateTime  || !subState.duration || !subState.priority || !subState.reminder || !subState.title}
                
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
        <div className='bg-[#F9F2ED] flex  w-9/12 h-11 justify-between items-center p-2 '>
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
              <select
          required
         
          onChange={handleChange}
          name="duration"
              id="duration"
                className='bigInputBox w-[150px] pl-2'
                placeholder='eg.2hrs'
        >
          
          
          <option>
            15 mins
          </option>
          <option>
            30 mins
          </option>
           
           <option>
            1 hrs
          </option>
           <option>
            2 hrs
          </option>
           <option>
            6 hrs
          </option>
           <option>
            12 hrs
          </option>

            </select>
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Reminder</label>
               <select
          name='reminder'
              onChange={handleChange}
                className='bigInputBox w-[150px]  pl-2'
                placeholder='eg.30mins'
              >
                
              
          
          <option >
            15 mins
          </option>
          <option>
            30 mins
          </option>         
          
          <option>
            1 hrs
          </option>
          <option>
           2 hrs
          </option>
        </select>
            </div>
           
        
        

          </div>
          <div className='flex justify-between gap-5 '>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Category</label>
              <select
          name='category'
                onChange={handleChange}
                className='bigInputBox w-[150px]  pl-2'
              >
          
          <option>
            Others
          </option>

          <option >
            Family
          </option>
          
          <option>
            Work
          </option>
          <option>
            Education
          </option>
          <option>
            Shopping
          </option>
        </select>

            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >Priority</label>
               
        <select
                name='priority'
                className='bigInputBox w-[150px]  pl-2'
          onChange={handleChange}>
          

          <option>
            1-Very low
          </option>

          <option >
            2-Low
          </option>
          
          <option>
            3-Midium
          </option>
          <option>
           4-High
          </option>
          <option>
            5-Very high
          </option>
        </select>
        

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
                  
                  
                  disabled = {falseInput || !state.dateTime || !state.catagory || !state.duration || !state.priority || !state.reminder || !state.title}
                  type="button" className=" subtaskBtn ">
                 add subtask</button>
        <button
          
                  // onClick={this.onSubmitSignin}
                  
                   disabled = {falseInput || !state.dateTime || !state.catagory || !state.duration || !state.priority || !state.reminder || !state.title}
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
       
        {
        falseInput ? <div className='errorMessag'>
         { falseInput}
        </div>:''
      }
      
    
    </div>
  )
}

export default AddTask