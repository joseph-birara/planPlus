import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import LangugeCheckBox from '../components/LangugeCheckBox'
import newIcon from '../../Assets/AcountIcons/checkIcon.png'
import translate from '../../Assets/translationLanguga'
import { selectCurrentTasks } from '../tasks/TaskSlice'
import { useSelector } from 'react-redux'



function Themes() {
  const [dark, setDark] = useState(false)
  const [light, setLight] = useState(false)
  const [auto, setAuto] = useState(true)
  const makeItDark = () => {
    setDark(true)
    setLight(false)
    setAuto(false)
  }
  const makeItLight = () => {
    setDark(false)
    setLight(true)
    setAuto(false)
  
  }
  const makeItAuto = () => {
    setDark(false)
    setLight(false)
    setAuto(true)
  
}
  const {languageChange} = useSelector(selectCurrentTasks)
  return (
    <div>
       <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/account'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
       { languageChange?translate.theme.eng:translate.theme.tg}
        </div>
          <div className='text-[#3AB0FF] mr-6 text-lg hover:cursor-pointer'>
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
                onClick={()=>makeItAuto()}
                className='relative'>
                <LangugeCheckBox atribute={"Auto"} />
                {auto?<div >
                  <img  className='h-5 w-7 absolute top-1 left-1 -mt-1 text-center ' src={newIcon} alt='log'/>

                </div>:''}
                

              </div>
                
                
              </td>
              <td>
                
              </td>
              
            </tr>
            <tr>
              <td>
                <div
                  onClick={()=>makeItLight()}
                  className='relative'>
                  <LangugeCheckBox atribute={"Light"} />
                  {light?<div >
                  <img  className='h-5 w-7 absolute top-1 left-1 -mt-1 text-center ' src={newIcon} alt='log'/>

                </div>:''}
                </div>
                
              </td>
            </tr>
            <tr>
              <td><div
                onClick={()=>makeItDark()}
                className='relative'>
                <LangugeCheckBox atribute={"Dark"} />
                {dark?<div >
                  <img  className='h-5 w-7 absolute top-1 left-1 -mt-1 text-center ' src={newIcon} alt='log'/>

                </div>:''
                }

              </div>
                
                
              </td>
            </tr>
          </table>
          </div>
              </div>
    </div>
  )
}

export default Themes