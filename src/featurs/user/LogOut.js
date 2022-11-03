import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logeOutAndNullToken } from './userSlice'

function LogOut() {
  
  const dispatch = useDispatch()
  return (
    <div className='absolute z-10 top-[90px] right-6 md:right-1 lg:right-[160px] text-center text-blue-800 text-xl'
      onClick={()=>dispatch(logeOutAndNullToken())}
    >
      

      <Link to='/login'>
        LogOut
      </Link>
      </div>
  )
}

export default LogOut