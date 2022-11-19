import React from 'react'
import { useSelector } from 'react-redux'
import translate from '../../Assets/translationLanguga'
import { selectCurrentTasks } from '../tasks/TaskSlice'

function PageNotFound() {
    const {languageChange} = useSelector(selectCurrentTasks)

  return (
      <div className='text-center mt-32 text-xl '>
      {
        languageChange?translate[404].eng:translate[404].tg
          }
          
    </div>
  )
}

export default PageNotFound