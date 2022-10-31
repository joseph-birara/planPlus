


export const calculatore = ({ task,changeHandler }) => {
     
  let arr = task.duration.split(' ')
  let addition = 0
  if (arr[1] === 'hrs') {
    addition = arr[0] * 3600000
  }
  else {
    addition = arr[0]*60000
  }
  let dateNow= new Date().toISOString()
  let counter = new Date(dateNow).getTime() 
  if ((counter) >= (new Date(task.dateTime).getTime() ) &&
    (counter) < ((new Date(task.dateTime).getTime()) + addition) &&
    task.status === 'Upcoming') {
    changeHandler(task._id,"In progress")
      
      
      
  }
  else if ((counter) > ((new Date(task.dateTime).getTime()) + addition) && (task.status === 'In progress' ||task.status === 'Upcoming')) {
    changeHandler(task._id,"Overdue")
       
        
  }
  
}