import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUsers } from '../user/userSlice'
import { CreateSubTask, GetAllTasks } from '../tasks/TaskActions'
import {selectCurrentTasks, subTaskcreateMessage} from '../tasks/TaskSlice'

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
  const [falseInput,setfalseInput]=useState('')
  
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
  useEffect(() => {
  
    if (props.task.dateTime > state.dateTime || props.task.duration < state.duration ||durationCalculatore(props.task)< durationCalculatore(state) ||new Date()> new Date(state.dateTime)) {
     setfalseInput("invalid starting time or duration")
    }
    else {
      setfalseInput("")
    }
   
  }, [state.dateTime,state.duration,])
  
  const timeSter=()=>setTimeout(() => {
    seterrOrSuc(true)
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
    
    
  return (
    <div className='w-screen h-screen bg-white z-50 absolute'>
      {
       subTaskAdded?<div className='errorMessag' >{subTaskAdded}</div>:''
      }
      <form className='flex flex-col gap-2 w-32 m-10'>
         <input
                 ref = {userref}
                  required
                  value={state.title}
                 onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title of the sub task "
          className="inputBox"
          
        />
        <textarea
                 
                  required
                  value={state.note}
                 onChange={handleChange}
                  type="text"
                  name="note"
                  id="note"
                  placeholder="note of the sub task "
          className="inputBox"
          
        />
        
        <select
          required
          value={state.duration}
          onChange={handleChange}
          name="duration"
          id="duration"
        >
          <option>
            30 mins
          </option>
          <option>
            15 mins
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
        
        <select
          name='priority'
          onChange={handleChange}>
          <option>
            1
          </option>

          <option >
            2
          </option>
          
          <option>
            3
          </option>
          <option>
           4
          </option>
          <option>
            5
          </option>
        </select>
        <select
          name='reminder'
          onChange={handleChange}>
          <option>
            30 mins
          </option>
          <option >
            15 mins
          </option>         

          
          
          <option>
            1 hrs
          </option>
          <option>
           2 hrs
          </option>
         
        </select>
        <input
                 
                  required
                  value={state.dateTime}
          onChange={handleChange}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                  placeholder="dateTime of the task "
          className="inputBox"
          
        />
        
        <button
          
                  // onClick={this.onSubmitSignin}
                  
                 disabled = {falseInput}
                 onClick={handleSubmit}
                  type="button" className=" btn mt-10">
                  Save subask</button>
        
      </form>
      {
        falseInput ? <div className='errorMessag'>
         { falseInput}
        </div>:''
      }
    </div>
  )
}



export default AddSubTask