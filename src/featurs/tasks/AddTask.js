import React, { useState } from 'react'

function AddTask() {
    const [state, setState] = useState({
        catagory: 'others',
        duration: '',
        priority: 1,
        startTime: ''
        
    })
    
    
  return (
      <div className=''>
          AddTask
          
    </div>
  )
}

export default AddTask