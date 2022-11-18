import React from 'react'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import LangugeCheckBox from '../components/LangugeCheckBox'
import newIcon from '../../Assets/AcountIcons/checkIcon.png'



function Themes() {
  return (
    <div>
       <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/account'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
       Theme
        </div>
        <div className='text-[#3AB0FF] mr-6 text-lg'>
         save

        </div>
        
    </div>

      </div> 
      <div className='flex flex-col items-center text-start'>
        <div className='flex flex-col gap-4 w-72  mt-5 items-center text-start mb-10'>
          <table>
            <tr>
              <td><div className='relative'>
                <LangugeCheckBox atribute={"Auto"} />
                <div >
                  <img  className='h-6 w-6 absolute top-1 left-1 -mt-1 text-center ' src={newIcon} alt='log'/>

                </div>
                

              </div>
                
                
              </td>
              <td>
                
              </td>
              
            </tr>
            <tr>
              <td>
                <div className='relative'>
                  <LangugeCheckBox atribute={"Light"} />
                  {/* {<div >
                  <img  className='h-6 w-6 absolute top-1 left-1 -mt-1 text-center ' src={newIcon} alt='log'/>

                </div>} */}
                </div>
                
              </td>
            </tr>
            <tr>
              <td><div className='relative'>
                <LangugeCheckBox atribute={"Dark"} />
                <div >
                  <img  className='h-6 w-6 absolute top-1 left-1 -mt-1 text-center ' src={newIcon} alt='log'/>

                </div>
                

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