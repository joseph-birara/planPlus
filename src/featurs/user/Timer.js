import React from 'react'

function Timer(props) {
  return (
    <div className='absolute h-3 w-6 left-20'>
          {
              props.timeAndSec
          }

    </div>
  )
}

export default Timer