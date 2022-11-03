import React, {  useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUsers } from '../user/userSlice'
import { GetAllTasks, UpdateData } from './TaskActions'
import { selectCurrentTasks, taskEditMessage } from './TaskSlice'



function Editask(props) {
    
  const dispatch = useDispatch()
  const { userToken } = useSelector(selectCurrentUsers)
  const { taskEdited } = useSelector(selectCurrentTasks)
  const [falseInput,setfalseInput]=useState('')
  const [errOrSuc, seterrOrSuc] = useState(true)
  const userref = useRef();
  

    
    
    const [state, setState] = useState({
        category: props.task.category,
        duration:props.task.duration,
        priority:props.task.priority,
       dateTime: new Date(new Date(props.task.dateTime).getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)  ,                           
      status: props.task.status,
      note:props.task.note,
      title: props.task.title,
      reminder:props.task.reminder
        
        
        
    })
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
    setState({...state,[e.target.name]:e.target.value})
  }
  const handleSubmit = async() => {
    await dispatch(UpdateData({ _id: props.task._id, title, note, dateTime, duration, category, priority, reminder, status, userToken }))
      .then(() => {
        dispatch(GetAllTasks({ userToken }))
        modify()
      })
      console.log(props.task._id);
      props.editHandler()
  }
    
   if(props.task._id) 
  {return (
     <div className='w-screen h-screen bg-white z-50 absolute'>
       {
        taskEdited?<div className='errorMessag' >{taskEdited}</div>:''
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
        ><option>
           duration
           </option>
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
              <select
                  value={state.category}
          name='category'
           onChange={handleChange}>
           <option>
            category
          </option>
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
        <select
           value={state.priority}
          name='priority'
           onChange={handleChange}>
           <option>
            priority
          </option>
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
           <option>
            reminder
          </option>
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
           Save Task</button>
         
        
       </form>
        {
        falseInput ? <div className='errorMessag'>
         { falseInput}
        </div>:''
       }
       
    </div>
  )}
}

export default Editask