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

import translate from '../../Assets/translationLanguga';
import {taskDraftNull,taskDraftPopulate} from '../tasks/TaskSlice'
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner'


function AddTask() {
  const {taskDraft,creatingTaskLoading} =useSelector(selectCurrentTasks)
  
  
  const {languageChange} = useSelector(selectCurrentTasks)
   const [taskDateTime,setTaskDateTime]=useState('')
    const [state, setState] = useState({
       dateTime:taskDraft.payload?new Date(taskDraft.payload.dateTime): taskDateTime,
       status: 'Upcoming',
       note: taskDraft.payload?taskDraft.payload.note:'',
      title:taskDraft.payload?taskDraft.payload.title:'',           
    })
  //task duration handlers
  //duration swich swichs true and false
  //setvalue set changes the value in the drop down
  //
  const [durationSwitch,setDurationSwich] = useState(false)
  const swichTataDuration = () => {
    setDurationSwich(!durationSwitch)
  }
  const [taskDuration, setTaskDuration] = useState(taskDraft.payload?taskDraft.payload.duration:'')
  const setValuesOfSelectDuration = (someData) => {
    setTaskDuration(someData)
    
  }
  //categories handlers 
  const [taskCategory, setTaskCategory] = useState(taskDraft.payload?taskDraft.payload.category:'')
  const setValuesOfSelectCategory = (someData) => {
    setTaskCategory(someData)    
  }
  const [categorySwitch,setCategorySwich] = useState(false)
  const swichTataCategory = () => {
    setCategorySwich(!categorySwitch)
  }
  
  //reminder handlers
  const [taskReminder, setTaskReminder] = useState(taskDraft.payload?taskDraft.payload.reminder:'')
  const setValuesOfSelectReminder = (someData) => {
    setTaskReminder(someData)    
  }
  const [reminderSwitch,setReminderSwich] = useState(false)
  const swichTataRemider = () => {
    setReminderSwich(!reminderSwitch)
  }
  //priority dropdown handlers
  const [taskPriority, setTaskPriority] = useState(taskDraft.payload?taskDraft.payload.priority:'')
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
        
    duration:subtaskDuration?!languageChange?translate.durationData.eng[ translate.durationData.tg.indexOf(subtaskDuration)]:subtaskDuration: '30 mins',
    priority:subTaskPriority?!languageChange?translate.priorityData.eng[ translate.priorityData.tg.indexOf(subTaskPriority)][0]:subTaskPriority[0]: 1,
    dateTime:'',     
    note: '',
    title: '',
    reminder:subTaskReminder?!languageChange?translate.reminderData.eng[ translate.reminderData.tg.indexOf(subTaskReminder)]:subTaskReminder: '30 mins'
    
   })
  // sub task state handlers 
  
  const [subtask, setsubtask] = useState(taskDraft.payload?taskDraft.payload.subs:[])
  
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
  const handleSubYes = () => {
    setshowSubTask(!showSubTask)
    setshowWarning(!showWarning)
    setsubState({
      duration: '',
      priority:'',
      dateTime:'',     
      note: '',
      title: '',
    reminder:'',
    })
  }
  //change subtask
  const subtaskAdder = () => {
    setsubtask(oldArray => [...oldArray, subState])
    setshowSubTask(!showSubTask)
    setsubState({
      duration: '',
      priority:'',
      dateTime:'',     
      note: '',
      title: '',
    reminder:'',
    })
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
  
  const mainTaskDraft = {
    "duration": taskDuration,
    "note": note,
    "priority":taskPriority,
    "dateTime": new Date(dateTime),
    "category": taskCategory,
    "reminder": taskReminder,
    "title": title,
    "subs":subtask
    
    
  }
  //saving draft 
  const saveDraft = () => {
    dispatch(taskDraftPopulate(mainTaskDraft))
   
  }
  //clear draft 
  const clearDraft = () => {
    dispatch(taskDraftNull())
  }
  const [taskWarning, setTaskWarning] = useState(false)
  const handleTaskYes = () => {
    setTaskWarning(!taskWarning)
    clearDraft()
  }
  const resSetTaskWarning = () => {
    setTaskWarning(!taskWarning)
  }
  console.log(state,"state");
  console.log(taskDraft.payload, "pay");
   const handleSubmit = async() => {
    await dispatch(CreateTask(
      {
        task:
        {
          title,
          note,
          dateTime: new Date(dateTime).toISOString(),
          duration: taskDuration ?!languageChange?translate.durationData.eng[ translate.durationData.tg.indexOf(taskDuration)]:taskDuration : "30 mins",
          category: taskCategory ? !languageChange?translate.categoryData.eng[ translate.categoryData.tg.indexOf(taskCategory)]:taskCategory : 'Others',
          priority: taskPriority ? !languageChange?translate.priorityData.eng[ translate.priorityData.tg.indexOf(taskPriority)][0]:taskPriority[0] : 1,
          reminder: taskReminder ?!languageChange?translate.reminderData.eng[ translate.reminderData.tg.indexOf(taskReminder)]: taskReminder : '30 mins'
        },
        subTask: subtask,
        userToken
      }))
      .then(() => dispatch(GetAllTasks({ userToken }))).then(() => {
       clearDraft()
      modify()
     })
  }
  if (creatingTaskLoading) {
    return(< LoadingSpiner/>)
  }
  if (showSubTask) {
    return (
      <div className=''>
      {
        showWarning?<ConfirmationMessage setWarning ={setWarning} item ={languageChange?translate.sureSubtask.eng:translate.sureSubtask.tg} handleYes={handleSubYes} pathProp={'addtask'}/>:''
      }
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
            <div
              onClick={ ()=>setshowSubTask(!showSubTask)}
              className='ml-6 mt-2 '>
          
    <LeftArraw />
    
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
              {
                languageChange?translate.addSubtasks.eng:translate.addSubask.tg
         }
        </div>
          <div
            onClick={()=>setshowWarning(!showWarning)}
            className='text-[#F87474] mr-6 hover:cursor-pointer'>
          {
                    languageChange?translate.cancel.eng:translate.cancel.tg
               }

        </div>
        
    </div>

      </div>
      
      
      <div className='flex flex-col items-center text-start'>
        <form className='flex flex-col gap-4 w-72 m-10 mt-5 items-center '>
          <div>
              <label className='flex items-start text-start  font-bold mb-1' >{ languageChange?translate.subtitle.eng:translate.subtitle.tg }</label>
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
                  placeholder={ languageChange?translate.taskTitlePlace.eng:translate.taskTitlePlace.tg}
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
              <label className='flex items-start text-start  font-bold mb-1' >{ languageChange?translate.dateAndTime.eng:translate.dateAndTime.tg }</label>
             <DatePicker
                selected={subState.dateTime}
                value={subState.dateTime}
                minuteInterval={5}

                 
             
              
                  
          onChange={date=>setsubState({...subState,dateTime:date})}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                 placeholderText={ languageChange?translate.dateAndTimePlace.eng:translate.dateAndTimePlace.tg}
                
                minDate={new Date(state.dateTime)}
                showYearDropdown
            scrollableYearDropdown
            showTimeSelect={true}
            dropdownMode={'select'}
            controls={['calendar']}
                className="bigInputBox"
                customInput={<div className={`bigInputBox flex justify-between ${!subState.dateTime ?'text-gray-500':''}`}>
                {
                    subState.dateTime ? subState.dateTime.toString().slice(4, 21) :
                       languageChange?translate.dateAndTimePlace.eng:translate.dateAndTimePlace.tg
                
                }
                <img className='w-4' src={timePickerIccon} alt='time' /></div>}
          
          
        />
              
          </div>
          <div className='flex justify-between gap-5'>
            <div>
                <label className='flex items-start text-start  font-bold mb-1 ' >{languageChange?translate.duration.eng:translate.duration.tg}</label>
              <DropDown
                place={languageChange?translate.durationPlace.eng:translate.durationPlace.tg}
                swichTata={swichSubtaskTataDuration}
                tata={subtaskdurationSwitch}
                realValue={subtaskDuration}
                setValuesOfSelect={setValuesOfSelectSubtaskDuration}
                data={languageChange?translate.durationData.eng:translate.durationData.tg}
               
        />
            </div>
            <div>
                <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.reminder.eng:translate.reminder.tg }</label>
               <DropDown        
                place={languageChange?translate.reminderPlace.eng:translate.reminderPlace.tg}
                swichTata={swichsubTaskTataRemider}
                tata={subTaskreminderSwitch}
                realValue={subTaskReminder}
                setValuesOfSelect={setValuesOfSelectSubTaskReminder}
                data={languageChange?translate.reminderData.eng:translate.reminderData.tg}
               
        />    
            </div>
           
        
        

          </div>
          <div >
            
            <div className='-ml-40'>
                <label className='flex items-start text-start  font-bold mb-1' >{ languageChange?translate.priority.eng:translate.priority.tg}</label>
               
        <DropDown        
         
                place={languageChange?translate.priorityplace.eng:translate.priorityplace.tg}
                swichTata={swichsubTaskTataPriority}
                tata={subTaskprioritySwitch}
                realValue={subTaskPriority}
                setValuesOfSelect={setValuesOfSelectSubTaskPriority}
                data={languageChange?translate.priorityData.eng:translate.priorityData.tg}
               
        /> 
        

            </div>
            
          </div>
          <div>
              <label className='flex items-start text-start  font-bold mb-1' >{ languageChange?translate.note.eng:translate.note.tg}</label>
            <div className='relative'>
            <textarea
                 maxLength={128}
                  required
                  value={subState.note}
                 onChange={handleSubChange}
                  type="text"
                  name="note"
                  id="note"
                  placeholder={languageChange?translate.noteplace.eng:translate.noteplace.tg}
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
                
                  type="button" className=" btn w-40 h-11">
                { languageChange?translate.saveSubtask.eng:translate.saveSubtask.tg}</button>
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
       {
        taskWarning?<ConfirmationMessage setWarning ={resSetTaskWarning} item ={languageChange?translate.sureCancelTask.eng:translate.sureCancelTask.tg} handleYes={handleTaskYes} pathProp={''}/>:''
      }
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
          <div
            onClick={()=>saveDraft()}
            className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
         {
                languageChange?translate.addTask.eng:translate.addTask.tg
         }
        </div>
          <div
            onClick={()=>resSetTaskWarning()}
            className='text-[#F87474] mr-6 hover:cursor-pointer'>
            
               {
                    languageChange?translate.cancel.eng:translate.cancel.tg
               }
           
            
         

        </div>
        
    </div>

      </div>
      
      {
        taskeCreated?<div className='errorMessag' >{taskeCreated}</div>:''
      }
      <div className='flex flex-col items-center text-start'>
        <form className='flex flex-col gap-4 w-72 m-10 mt-5 items-center '>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >{ languageChange?translate.taskTitle.eng:translate.taskTitle.tg }</label>
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
                   placeholder={ languageChange?translate.taskTitlePlace.eng:translate.taskTitlePlace.tg}
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
            <label className='flex items-start text-start  font-bold mb-1' >{ languageChange?translate.dateAndTime.eng:translate.dateAndTime.tg }</label>
            
      <  DatePicker
                selected={state.dateTime}
                              
             
              
                  
          onChange={date=>setState({...state,dateTime:date})}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                 placeholderText={ languageChange?translate.dateAndTimePlace.eng:translate.dateAndTimePlace.tg}
                
                minDate={new Date()}
                showYearDropdown
            scrollableYearDropdown
            showTimeSelect={true}
            // dropdownMode={'select'}
            // controls={['calendar']}
              className="bigInputBox"
              customInput={<div className={`bigInputBox flex justify-between ${!state.dateTime?'text-gray-500':''}`}>
                {
                 state.dateTime?state.dateTime.toString().slice(4,21): languageChange?translate.dateAndTimePlace.eng:translate.dateAndTimePlace.tg
                }
                <img className='w-4' src={timePickerIccon} alt='time' /></div>}
          
        />
          </div>
          <div className='flex justify-between gap-5 '>
            <div>
              <label className='flex items-start text-start  font-bold mb-1 ' >{languageChange?translate.duration.eng:translate.duration.tg}</label>
              
              <DropDown
          
         
                place={languageChange?translate.durationPlace.eng:translate.durationPlace.tg}
                swichTata={swichTataDuration}
                tata={durationSwitch}
                realValue={taskDuration}
                setValuesOfSelect={setValuesOfSelectDuration}
              data={languageChange?translate.durationData.eng:translate.durationData.tg}
               
        />
          
           

            
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.reminder.eng:translate.reminder.tg }</label>
               <DropDown
          
         
                place={languageChange?translate.reminderPlace.eng:translate.reminderPlace.tg }
                swichTata={swichTataRemider}
                tata={reminderSwitch}
                realValue={taskReminder}
                setValuesOfSelect={setValuesOfSelectReminder}
                data={languageChange?translate.reminderData.eng:translate.reminderData.tg}
               
        />              
              
          
        
            </div>
           
        
        

          </div>
          <div className='flex justify-between gap-5 '>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.category.eng:translate.category.tg}</label>
              <DropDown
          
         
                place={languageChange?translate.categoryplace.eng:translate.categoryplace.tg}
                swichTata={swichTataCategory}
                tata={categorySwitch}
                realValue={taskCategory}
                setValuesOfSelect={setValuesOfSelectCategory}
                data={languageChange?translate.categoryData.eng:translate.categoryData.tg}
               
        /> 
          
         

            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.priority.eng:translate.priority.tg}</label>
               
       <DropDown        
         place={languageChange?translate.priorityplace.eng:translate.priorityplace.tg}
                swichTata={swichTataPriority}
                tata={prioritySwitch}
                realValue={taskPriority}
                setValuesOfSelect={setValuesOfSelectPriority}
                data={languageChange?translate.priorityData.eng:translate.priorityData.tg}
               
        /> 
        

            </div>
            
          </div>
         
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.note.eng:translate.note.tg}</label>
            <div className='relative'>
            <textarea
                 maxLength={128}
                  required
                  value={state.note}
                 onChange={handleChange}
                  type="text"
                  name="note"
                  id="note"
                  placeholder={languageChange?translate.noteplace.eng:translate.noteplace.tg}
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
            <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.subtasks.eng:translate.subtasks.tg }</label>
            {
              subtask.map((sub,index)=> <SubTaskInsideAddTask subTask={sub } index={index+1} />)
            }
           
          </div>:''}
         
          
        
        
        
      
          <span className='flex gap-6 justify-between'>
             <button
          
                   onClick={()=>setshowSubTask(!showSubTask)}
                  
                  
                  disabled = {falseInput || !state.dateTime ||  !state.title}
                  type="button" className=" subtaskBtn ">
              {languageChange ? translate.addSubtasks.eng:translate.addSubtasks.tg}</button>
        <button
          
                  // onClick={this.onSubmitSignin}
                  
                   disabled = {falseInput || !state.dateTime  || !state.title}
                 onClick={handleSubmit}
                  type="button" className=" btn">
              {languageChange?translate.saveTask.eng:translate.saveTask.tg }</button>
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