


export const calculatore = ({ task,changeHandler }) => {
     
  let arr = task.duration.split(' ')
  let addition = 0
  if (arr[1] === 'hrs') {
    addition = arr[0] * 60
  }
  else {
    addition = arr[0]
  }
    
  let counter = new Date().getTime() / 60000
  if ((counter) > (new Date(task.dateTime).getTime() / 60000) &&
    (counter) < ((new Date(task.dateTime).getTime() / 600000) + addition) &&
    task.status === 'Upcoming') {
    changeHandler(task._id,"In progress")
      
      
    //  dispatch(UpdateStatus({ _id:task._id, status: "In progress",userToken }))
      
  }
  else if ((counter) > ((new Date(task.dateTime).getTime() / 60000) + addition) && task.status === 'In progress') {
    changeHandler(task._id,"Overdue")
       
    //    dispatch(UpdateStatus({
    //      _id: task._id,
    //      status: "Overdue",
    //      userToken
    //    }))
    //  }
           
    
  }
}