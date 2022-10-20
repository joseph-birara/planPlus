import React, { useEffect, useState, useCallback } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { selectCurrentTasks } from './TaskSlice';
import { UpdateStatus} from './TaskActions'


function Calculatore() {
  const [counter, setcounter] = useState(new Date())
  const timeOutCallback = useCallback(() => setcounter(new Date().getTime()), []);
  const { allTasks } = useSelector(selectCurrentTasks)
  const dispatch = useDispatch()
  
  useEffect(() => {
    setTimeout(timeOutCallback, 60000);
    
  }, [counter, timeOutCallback]);
  console.log(counter)
  useEffect(() => {
    if (allTasks) {
      allTasks.forEach(task => {
    let arr = task.duration.split(' ')
    let addition =0
    if (arr[1] === 'hrs') {
      addition = arr[0] *60
    }
    else {
      addition = arr[0]
    }
    
    
     if ((counter / 60000) > (task.dateTime.getTime / 60000) && (counter / 60000) < (task.dateTime.getTime() / 600000) + addition && task.status !== 'In progress') {
      task.status = 'In progress'
      dispatch(UpdateStatus(task.id,'In progress'))
      
     }
   else if ((counter / 60000) > (task.dateTime.getTime / 60000) && task.status === 'In progress') {
       task.status = 'Overdue'
       dispatch(UpdateStatus(task.id,'Overdue'))
     }
            let allcanceld=0
            task.sub.foreach(subtask => {
              if (subtask.status === 'Canceld') {
                allcanceld = allcanceld +1
              }
            }
              
            )
            if (allcanceld === task.sub.length && task.sub>0) {
              dispatch(UpdateStatus(task.id, 'Canceld'))
              allcanceld =0
            }
            let allDone=0
            task.sub.foreach(subtask => {
              if (subtask.status === 'Canceld') {
                allDone = allDone +1
              }
            }
              
            )
            if (allDone === task.sub.length && task.sub>0) {
              dispatch(UpdateStatus(task.id, 'Done'))
              allDone =0
            }
    
  });
    
      
    }
    
    
  }, [counter]);

  
  
  return (
    <div >
      

    </div>

  )
}

export default React.memo(Calculatore)