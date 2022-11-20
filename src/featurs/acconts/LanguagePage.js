import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import FilterCheckBox from '../components/FilterCheckBox'
import LangugeCheckBox from '../components/LangugeCheckBox'
import icon from '../../Assets/AcountIcons/checkIcon.svg'
import DoneUndone from '../../Assets/IconCollection/DoneUndone'
import LangugeCheckIcon from '../../Assets/AcountIcons/LangugeCheckIcon'
import newIcon from '../../Assets/AcountIcons/checkIcon.png'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentTasks } from '../tasks/TaskSlice'
import { languageChangeToTigrigna,languageChangeToEnglish} from '../tasks/TaskSlice'
import translate from '../../Assets/translationLanguga'

const LanguagePage = () => {
  
  const { languageChange } = useSelector(selectCurrentTasks)
  console.log(languageChange);
  const [english, setEnglish] = useState(false)
  const [ትግርኛ,setትግርኛ] = useState(false)
  const dispatch = useDispatch()
  const saveHandler = () => {
    if (english) {
      dispatch(languageChangeToEnglish())
      
    }
    if (ትግርኛ) {
      dispatch(languageChangeToTigrigna())
    }
  }
  return (
    <div>
       <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/account'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
       { languageChange?"Language":"ቋንቋ"}
        </div>
          <div
            onClick={()=>saveHandler()}
            className='text-[#3AB0FF] mr-6 text-lg hover:cursor-pointer'>
            <Link to='/account'>
             { languageChange?translate.save.eng:translate.save.tg}
            </Link>

        </div>
        
    </div>

      </div> 
      <div className='flex flex-col items-center text-start'>
        <div className='flex flex-col gap-4 w-72  mt-5 items-center text-start mb-10'>
          <table>
            <tr>
              <td><div
                onClick={() => {
                    setEnglish(!english)
                  setትግርኛ(false)
                 
                  }}
                className='relative'>
                <LangugeCheckBox atribute={"English"} />
               {english? <div >
                  <img  className='h-5 w-6 absolute top-1 left-1 -mt-1 text-center ' src={newIcon} alt='log'/>

                </div>:''}
                

              </div>
                
                
              </td>
              <td>
                
              </td>
              
            </tr>
            <tr>
              <td>
                <div
                  onClick={() => {
                    setEnglish(false)
                    setትግርኛ(!ትግርኛ)
                   
                  }}
                  className='relative'>
                  <LangugeCheckBox atribute={"ትግርኛ"} />
                  {ትግርኛ?<div >
                  <img  className='h-5 w-6 absolute top-1 left-1 -mt-1 text-center ' src={newIcon} alt='log'/>

                </div>:''}
                </div>
                
              </td>
            </tr>
          </table>
          </div>
              </div>
    </div>
  )
}

export default LanguagePage