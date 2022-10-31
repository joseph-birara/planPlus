import { CAlert } from '@coreui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Await, Link } from 'react-router-dom'
import { selectCurrentUsers } from '../user/userSlice'
import { CreateTask, GetAllTasks } from './TaskActions'
import { selectCurrentTasks,empity } from './TaskSlice'

function AddTask() {
    const [state, setState] = useState({
        catagory: 'Others',
        duration: '30 mins',
        priority: 1,
      dateTime: new Date(),
      status: 'Upcoming',
      note: '',
      title: '',
      reminder:'30 mins'
        
        
        
    })
  
  
  const userref = useRef();
  const {taskeCreated} = useSelector(selectCurrentTasks)
  const {userToken} = useSelector(selectCurrentUsers)
  const dispatch = useDispatch()
  const [errOrSuc, seterrOrSuc] = useState(true)
  const [falseInput,setfalseInput]=useState('')
  const { title, note, dateTime, duration, category, priority, reminder } = state
  const handleChange = (e) => {
    setState({...state,[e.target.name]:e.target.value})
  }
  //make the error or succes massage empity
  useEffect(() => {
    if (errOrSuc) {
      dispatch(empity())
    }
    
  
    
  }, [errOrSuc])
  
  const timeSter=()=>setTimeout(() => {
    seterrOrSuc(true)
    console.log("inside timeout");
    }, 3000);
  const modify = () => {
    seterrOrSuc(!errOrSuc)
    timeSter()
    
    
    
            }
  const handleSubmit = async() => {
   await dispatch(CreateTask({ title, note, dateTime, duration, category, priority, reminder, userToken }))
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
  return (
    
    <div className=''>
      <button
          
                 
        type="button" className=" btn mt-10">
       <Link to='/'>Back to home</Link> 
      </button>
      {
        taskeCreated?<div className='errorMessag' >{taskeCreated}</div>:''
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
         
          onChange={handleChange}
          name="duration"
          id="duration"
        >
          <option>
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
          name='reminder'
          onChange={handleChange}>
          <option >
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
        starting time:
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