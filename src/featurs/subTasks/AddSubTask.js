import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUsers } from '../user/userSlice'
import { CreateSubTask, GetAllTasks } from '../tasks/TaskActions'
import {
  selectCurrentTasks,
  subTaskcreateMessage,
  subtaskDraftPopulate,
  subtaskDraftNull} from '../tasks/TaskSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import ConfirmationMessage from '../components/ConfirmationMessage'
import Moment from 'react-moment'
import translate from '../../Assets/translationLanguga';
import DatePicker from "react-datepicker";
import timePickerIccon from '../../Assets/IconCollection/timePicker.svg'
import DropDown from '../components/DropDown'
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner'


function AddSubTask(props) {
  const location= useLocation()
 
  const userref = useRef();
  const {subTaskAdded,createSubtaskLoading, subtaskDraft} = useSelector(selectCurrentTasks)
  const { userToken } = useSelector(selectCurrentUsers)
  const {languageChange} = useSelector(selectCurrentTasks)
  const dispatch = useDispatch()
  const [errOrSuc, seterrOrSuc] = useState(true)
  const [falseInput, setfalseInput] = useState('')
  const [showWarning, setshowWarning] = useState(false)
  const [subdateTime,setDatetime]=useState('')
  
  
  
  const handleSubYes =
    () => {
    
  }
  
  //message handiling
  useEffect(() => {
    if (errOrSuc) {
      dispatch(subTaskcreateMessage())
    }
    
  
    
  }, [errOrSuc])
  //function to identify hours or mins
  // const durationCalculatore = (xyz) => {
  //   let arr = xyz.duration.split(' ')
  //   let addition
  // if (arr[1] === 'hrs') {
  //  addition = arr[0] * 3600000
  // }
  // else {
  //   addition = arr[0]*60000
  // }
  //   return addition +( new Date(xyz.dateTime).getTime())
  // }
 // use efrect to check date time
  // useEffect(() => {
  
  //   if (props.task.dateTime > subState.dateTime || props.task.duration < subState.duration ||durationCalculatore(props.task)< durationCalculatore(subState) ||new Date()> new Date(subState.dateTime)) {
  //    setfalseInput("invalid starting time or duration")
  //   }
  //   else {
  //     setfalseInput("")
  //   }
   
  // }, [subState.dateTime,subState.duration])
  

  const navigate =useNavigate()
  const timeSter=()=>setTimeout(() => {
    seterrOrSuc(true)
    if (!subTaskAdded) {
       navigate("/")
    }
    console.log("inside timeout");
    }, 3000);
  const modify = () => {
    seterrOrSuc(!errOrSuc)
    timeSter()
    
   
    
    
    
    
  }
  const setWarning = () => setshowWarning(!showWarning)
  
  //focus on the input
  useEffect(() => {
        userref.current.focus();
    }, [])
    
   //suntaskd states
  
  // duration handler
  const [subtaskdurationSwitch,setSubTaskDurationSwich] = useState(false)
  const swichSubtaskTataDuration = () => {
    setSubTaskDurationSwich(!subtaskdurationSwitch)
  }
  console.log(subtaskDraft);
  const [subtaskDuration, setSubtaskTaskDuration] = useState(subtaskDraft?subtaskDraft.duration:'')
  const setValuesOfSelectSubtaskDuration = (someData) => {
    setSubtaskTaskDuration(someData)
    
  }
  
  //reminder handlers
  const [subTaskReminder, setsubTaskReminder] = useState(subtaskDraft?subtaskDraft.reminder:'')
  const setValuesOfSelectSubTaskReminder = (someData) => {
    setsubTaskReminder(someData)    
  }
  const [subTaskreminderSwitch,setSubTaskReminderSwich] = useState(false)
  const swichsubTaskTataRemider = () => {
    setSubTaskReminderSwich(!subTaskreminderSwitch)
  }
  //priority dropdown handlers
  const [subTaskPriority, setsubTaskPriority] = useState(subtaskDraft?subtaskDraft.priority:'')
  const setValuesOfSelectSubTaskPriority = (someData) => {
   setsubTaskPriority(someData)    
  }
  const [subTaskprioritySwitch,setSubTaskPrioritySwich] = useState(false)
  const swichsubTaskTataPriority = () => {
   setSubTaskPrioritySwich(!subTaskprioritySwitch)
  } 
  console.log(subtaskDraft);
  const [subState, setsubState] = useState({
        
    duration:subtaskDuration?subtaskDuration: '30 mins',
    priority:subTaskPriority?subTaskPriority: 1,
    dateTime:subtaskDraft?subtaskDraft.dateTime: '',     
    note:subtaskDraft?subtaskDraft.note: '',
    title: subtaskDraft?subtaskDraft.title: '',
    reminder:subTaskReminder?subTaskReminder: '30 mins'
    
  })
  console.log(location);
  const { title, note, dateTime, duration,  priority, reminder } = subState
  const handleSubChange = (e) => {
    setsubState({ ...subState, [e.target.name]: e.target.value })
    
  }
  //clear and save draft 
  const clearDraft = () => {
    dispatch(subtaskDraftNull())
  }
  const saveSubtaskDraft = () => {
    dispatch(subtaskDraftPopulate(subState))
  }
  const handleSubmit = async() => {
    await dispatch(CreateSubTask({ id: location.state.parentId._id, title, note, dateTime, duration, priority, reminder, userToken })).then(() => {
      clearDraft()
      modify()

    })
     
  
  }

  return (
      <div className=''>
      {
        showWarning?<ConfirmationMessage setWarning ={setWarning} item ={languageChange?translate.sureSubtask.eng:translate.sureSubtask.tg} handleYes={handleSubYes} pathProp={''}/>:''
      }
      
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
          <div onClick={()=>saveSubtaskDraft()}
            className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw />
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
              {
                languageChange?translate.addSubtasks.eng:translate.addSubask.tg
         }
        </div>
          <div
            onClick={() => {
              clearDraft()
              setshowWarning(!showWarning)
            }}
            className='text-[#F87474] mr-6 hover:cursor-pointer'>
          {
                    languageChange?translate.cancel.eng:translate.cancel.tg
               }

        </div>
        
    </div>

      </div>
      {
        subTaskAdded ? <div className={`errorMessag text-green-600 text-xl
         ${subTaskAdded === "sub task rejected"?'text-red-800':''}`}>
          { subTaskAdded}
        </div>:''
      }
      
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
                selected={subdateTime}
              value={subdateTime}
              minTime={location.state.dateTime}
              timeIntervals={5}

                 
             
              
                  
          onChange={date=>setsubState({...subState,dateTime:date})}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                 placeholderText={ languageChange?translate.dateAndTimePlace.eng:translate.dateAndTimePlace.tg}
                
               
                showYearDropdown
            scrollableYearDropdown
            showTimeSelect={true}
            dropdownMode={'select'}
            controls={['calendar']}
                className="bigInputBox"
              customInput={<div className={`bigInputBox flex justify-between ${!subState.dateTime ? 'text-gray-500' : ''}`}>
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
          
                  onClick={handleSubmit}
                  
                   disabled = { !subState.dateTime || !subState.title}
                
                  type="button" className=" btn w-40 h-11">
                { languageChange?translate.saveSubtask.eng:translate.saveSubtask.tg}</button>
        </span>
       
        
          </form>
         

      </div>
      
     
       
        {
        falseInput ? <div className='errorMessag'>
         { falseInput}
        </div>:''
      }
       {createSubtaskLoading?
    < LoadingSpiner/>:''
  }
    </div>
    )
}



export default AddSubTask