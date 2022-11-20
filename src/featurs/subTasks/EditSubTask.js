import React, {  useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import ConfirmationMessage from '../components/ConfirmationMessage'
import DropDown from '../components/DropDown'
import { GetAllTasks, UpdateSubTaskData } from '../tasks/TaskActions'
import { selectCurrentTasks } from '../tasks/TaskSlice'
import { selectCurrentUsers } from '../user/userSlice'
import translate from '../../Assets/translationLanguga';
import LoadingSpiner from '../../Assets/IconCollection/LoadingSpiner'

function EditSubTask() {
  const {languageChange,creatingTaskLoading} = useSelector(selectCurrentTasks)
  const location = useLocation()
  const [task, settask] = useState(location.state.detail)
    const dispatch = useDispatch()
  const { userToken } = useSelector(selectCurrentUsers)
  const {subTaskEdited} =useSelector(selectCurrentTasks)
  const [showWarning,setshowWarning]=useState(false)
  const userref = useRef();
  const [falseInput,setfalseInput]=useState(false)
    
    const [state, setState] = useState({
        
        duration:languageChange?task.duration:translate.durationData.tg[translate.durationData.eng.indexOf(task.duration)] ,
        priority:languageChange?translate.priorityData.eng[task.priority-1]:translate.priorityData.tg[task.priority-1],
       dateTime: new Date(new Date(task.dateTime).getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19),
      status: task.status,
      note:task.note,
      title: task.title,
      reminder:languageChange?task.reminder:translate.reminderData.tg[translate.reminderData.eng.indexOf(task.reminder)] ,
        
        
        
    })
  //state to to swich drop down
  const [swichersFortaskEdit, setswichersFortaskEdit] = useState({
    taskReminder: false,
    taskPriority: false,
    taskDuration: false,
    
    
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
  const state_duration_Updater=(someValue) => {
    setState({ ...state, duration: someValue })
    setfalseInput(true)

    
  }
  const state_priority_Updater=(someValue) => {
    setState({ ...state, priority: someValue })
    setfalseInput(true)
  }
  
  const state_reminder_Updater=(someValue) => {
    setState({ ...state, reminder: someValue })
    setfalseInput(true)
                }
  

  const { title, note, dateTime, duration, priority, reminder,status } = state
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    setfalseInput(true)
  }
  const handleSubmit = async() => {
    await dispatch(UpdateSubTaskData(
      {
        _id: task._id,
        title, note,
        dateTime,
        duration: duration ?!languageChange?translate.durationData.eng[ translate.durationData.tg.indexOf(duration)]:duration : "30 mins",
        priority: priority ? !languageChange?translate.priorityData.eng[ translate.priorityData.tg.indexOf(priority)][0]:priority[0] : 1,
        reminder:reminder ?!languageChange?translate.reminderData.eng[ translate.reminderData.tg.indexOf(reminder)]: reminder : '30 mins',
        status,
        userToken
      })) 
    .then(()=>dispatch(GetAllTasks({ userToken })))
      
  }
  console.log(state,"state");
  console.log(task, "task");
  

  /// for confirmation
  const handleSubYes = () => {
    //
  }
  //function to identify hours or mins
  const durationCalculatore = (xyz) => {
    let arr = xyz.duration.split(' ')
    let addition
  if (arr[1] === 'hrs') {
   addition = arr[0] * 3600000
  }
  else {
    addition = arr[0]*60000
  }
    return addition +( new Date(xyz.dateTime).getTime())
  }
    //set and unset false inpute
  // useEffect(() => {
  
  //   if (task.dateTime > state.dateTime || task.duration < state.duration ||durationCalculatore(task)< durationCalculatore(state)||new Date()> new Date(state.dateTime)) {
  //    setfalseInput("invalid starting time or duration")
  //   }
  //   else {
  //     setfalseInput("")
  //   }
   
  // }, [state.dateTime,state.duration,])
  //focus on the input
  useEffect(() => {
        userref.current.focus();
  }, [])
  const setWarning = () => setshowWarning(!showWarning)
  if (creatingTaskLoading) {
    return(< LoadingSpiner/>)
  }
   if(task._id) 
  {return (
    <div className=''>
      {
        showWarning?<ConfirmationMessage setWarning ={setWarning} item ={languageChange?translate.sureMaintaskEdit.eng:translate.sureMaintaskEdit.tg} handleYes={handleSubYes} pathProp={''} />:''
      }
      <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw />
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
             {
               languageChange?translate.updateSubask.eng:translate.updateSubask.tg
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
      
      {
        subTaskEdited?<div className='errorMessag' >{subTaskEdited}</div>:''
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
          <div className='flex justify-between gap-5'>
            <div>
              <label className='flex items-start text-start  font-bold mb-1 ' >{languageChange?translate.duration.eng:translate.duration.tg}</label>
               <DropDown
          
         
                place='eg. 2hrs'
                swichTata={ switchDuration}
                tata={swichersFortaskEdit.taskDuration}
                realValue={state.duration}
                 setValuesOfSelect={state_duration_Updater}
                data={languageChange?translate.durationData.eng:translate.durationData.tg}
               
        />
            </div>
            <div>
              <label className='flex items-start text-start  font-bold mb-1' >{languageChange?translate.reminder.eng:translate.reminder.tg }</label>
              <DropDown
          
         
                place='eg.30 mins'
                swichTata={switchReminder}
                tata={swichersFortaskEdit.taskReminder}
                realValue={state.reminder}
                setValuesOfSelect={state_reminder_Updater}
                 data={languageChange?translate.reminderData.eng:translate.reminderData.tg}
               
        />   
            </div>
           
        
        

          </div>
          <div >
            
            <div className='-ml-40'>
              <label className='flex items-start text-start  font-bold mb-1' >{ languageChange?translate.priority.eng:translate.priority.tg}</label>
               
       <DropDown        
         
               place={languageChange?translate.priorityplace.eng:translate.priorityplace.tg}
                swichTata={switchPriority}
                tata={swichersFortaskEdit.taskPriority}
                realValue={state.priority}
                setValuesOfSelect={state_priority_Updater}
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
          
        
        
        
      
          <span className='flex gap-6 justify-between'>
             
        <button
          
                  // onClick={this.onSubmitSignin}
                  
                   disabled = {!falseInput || !state.dateTime  || !state.title}
                 onClick={handleSubmit}
                  type="button" className=" btn w-40 h-11">
               { languageChange?translate.updateSubask.eng:translate.updateSubask.tg}</button>
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
      } */}
      
    </div>
  )}
}

export default EditSubTask