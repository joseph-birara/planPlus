import React from 'react'
import TooDoo_logo from '../TooDoo Logo/TooDoo_logo.png'

function LoadingPage() {
  return (
    <div className='h-screen bg-[#F9F2ED] flex items-center'> <div className='flex flex-col  items-center gap-10 w-full'>
          <img  src={TooDoo_logo} alt='logo' className='m-10 h-15 w-1/6' />
          <h1 className='text-center text-7xl'>
              TooDoo
      </h1>
    </div>
      </div>
  )
}

export default LoadingPage