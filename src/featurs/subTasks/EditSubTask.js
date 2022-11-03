import React, {  useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GetAllTasks, UpdateSubTaskData } from '../tasks/TaskActions'
import { selectCurrentUsers } from '../user/userSlice'

function EditSubTask(props) {
    
    const dispatch = useDispatch()
    const { userToken } = useSelector(selectCurrentUsers)
  const userref = useRef();
  const [falseInput,setfalseInput]=useState('')
    
    const [state, setState] = useState({
        
        duration:props.task.duration,
        priority:props.task.priority,
       dateTime: props.task.dateTime,
      status: props.task.status,
      note:props.task.note,
      title: props.task.title,
      reminder:props.task.reminder
        
        
        
    })

  const { title, note, dateTime, duration, priority, reminder,status } = state
  const handleChange = (e) => {
    setState({...state,[e.target.name]:e.target.value})
  }
  const handleSubmit = async() => {
    await dispatch(UpdateSubTaskData({ _id: props.task._id, title, note, dateTime, duration, priority, reminder, status, userToken })) 
    .then(()=>dispatch(GetAllTasks({ userToken })))
      props.editHandler()
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
  useEffect(() => {
  
    if (props.task.dateTime > state.dateTime || props.task.duration < state.duration ||durationCalculatore(props.task)< durationCalculatore(state)||new Date()> new Date(state.dateTime)) {
     setfalseInput("invalid starting time or duration")
    }
    else {
      setfalseInput("")
    }
   
  }, [state.dateTime,state.duration,])
  //focus on the input
  useEffect(() => {
        userref.current.focus();
    }, [])
   if(props.task._id) 
  {return (
      <div className='w-screen h-screen bg-white z-50 absolute'>
      <form className='flex flex-col gap-2 w-32 m-10'>
         <input
                 ref = {userref}
                  required
                  value={state.title}
                 onChange={handleChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="title of the task "
          className="inputBox"
          
        />
        <textarea
                 
                  required
                  value={state.note}
                 onChange={handleChange}
                  type="text"
                  name="note"
                  id="note"
                  placeholder="note of the task "
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
           value={state.priority}
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
          value={state.reminder}
                  name='reminder'
          onChange={handleChange}>
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
           Save subTask</button>
         
        
       </form>
       
       {
        falseInput ? <div className='errorMessag'>
         { falseInput}
        </div>:''
      }
    </div>
  )}
}

export default EditSubTask