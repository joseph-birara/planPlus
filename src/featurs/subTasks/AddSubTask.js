import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUsers } from '../user/userSlice'
import { CreateSubTask, GetAllTasks } from '../tasks/TaskActions'
import {selectCurrentTasks, subTaskcreateMessage} from '../tasks/TaskSlice'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import ConfirmationMessage from '../components/ConfirmationMessage'

function AddSubTask(props) {
 const [state, setState] = useState({
        
    duration: '30 mins',
    priority: 1,
    dateTime: new Date(),     
      note: '',
      title: '',
      reminder:'30 mins'
        
        
        
 })
  const userref = useRef();
  const {subTaskAdded} = useSelector(selectCurrentTasks)
  const {userToken} = useSelector(selectCurrentUsers)
  const dispatch = useDispatch()
  const [errOrSuc, seterrOrSuc] = useState(true)
  const [falseInput, setfalseInput] = useState('')
  const [showWarning,setshowWarning]=useState(false)
  
  const { title, note, dateTime, duration,  priority, reminder } = state
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    
  }
  const handleSubmit = async() => {
   await dispatch(CreateSubTask({ id: props.task._id, title, note, dateTime, duration, priority, reminder, userToken }))
     .then(() => {
       dispatch(GetAllTasks({ userToken }))
     modify()})
    props.handleClick()
  }
  //message handiling
  useEffect(() => {
    if (errOrSuc) {
      dispatch(subTaskcreateMessage())
    }
    
  
    
  }, [errOrSuc])
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
  //use efrect to check date time
  // useEffect(() => {
  
  //   if (props.task.dateTime > state.dateTime || props.task.duration < state.duration ||durationCalculatore(props.task)< durationCalculatore(state) ||new Date()> new Date(state.dateTime)) {
  //    setfalseInput("invalid starting time or duration")
  //   }
  //   else {
  //     setfalseInput("")
  //   }
   
  // }, [state.dateTime,state.duration])
  
  const timeSter=()=>setTimeout(() => {
    seterrOrSuc(true)
    console.log("inside timeout");
    }, 3000);
  const modify = () => {
    seterrOrSuc(!errOrSuc)
    timeSter()
    
    
    
  }
  const setWarning =()=> setshowWarning(!showWarning)
  //focus on the input
  useEffect(() => {
        userref.current.focus();
    }, [])
    
    
  return (
    <div className=''>
      {
        showWarning?<ConfirmationMessage setWarning ={setWarning} item ={'subtask'} />:''
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
      
      {
        subTaskAdded?<div className='errorMessag' >{subTaskAdded}</div>:''
      }
      <div className='flex flex-col items-center text-start'>
        <form className='flex flex-col gap-4 w-72 m-10 mt-5 items-center '>
          <div>
            <label className='flex items-start text-start  font-bold mb-1' >subtask title</label>
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
          <div className='flex justify-between gap-5'>
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
          
        
        
        
      
          <span className='flex gap-6 justify-between'>
             
        <button
          
                  // onClick={this.onSubmitSignin}
                  
                   disabled = {falseInput || !state.dateTime  || !state.duration || !state.priority || !state.reminder || !state.title}
                 onClick={handleSubmit}
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



export default AddSubTask