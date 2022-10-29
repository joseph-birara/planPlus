import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUsers } from '../user/userSlice'
import { UpdateData } from './TaskActions'

function Editask(props) {
    
    const dispatch = useDispatch()
    const { userToken } = useSelector(selectCurrentUsers)
    
    
    const [state, setState] = useState({
        category: props.task.category,
        duration:props.task.duration,
        priority:props.task.priority,
       dateTime: props.task.dateTime,
      status: props.task.status,
      note:props.task.note,
      title: props.task.title,
      reminder:props.task.reminder
        
        
        
    })

  const { title, note, dateTime, duration, category, priority, reminder,status } = state
  const handleChange = (e) => {
    setState({...state,[e.target.name]:e.target.value})
  }
  const handleSubmit = () => {
      dispatch(UpdateData({ _id: props.task._id, title, note, dateTime, duration, category, priority, reminder, status, userToken }))
      console.log(props.task._id);
      props.editHandler()
  }
    
   if(props.task._id) 
  {return (
      <div className='w-screen h-screen bg-white z-50 absolute'>
      <form className='flex flex-col gap-2 w-32 m-10'>
         <input
                 
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
        <input
                 
                  required
                  value={state.duration}
                 onChange={handleChange}
                  type="text"
                  name="duration"
                  id="duration"
                  placeholder="duration of the task "
          className="inputBox"
          
        />
              <select
                  value={state.category}
          name='category'
          onChange={handleChange}>
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
            Shoping
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
                  value={new Date(state.dateTime)}
          onChange={handleChange}
                  type="datetime-local"
                  name="dateTime"
          id="dateTime"
          
                  placeholder="dateTime of the task "
          className="inputBox"
          
        />
        
        <button
          
                  // onClick={this.onSubmitSignin}
                  
                  // disabled = {!email || password.length<8}
                 onClick={handleSubmit}
                  type="button" className=" btn mt-10">
                  Save Task</button>
        
        </form>
    </div>
  )}
}

export default Editask