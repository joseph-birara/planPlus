import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LeftArraw from '../../Assets/IconCollection/LeftArraw'
import FilterCheckBox from './FilterCheckBox'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import MultiRangeSlider from "multi-range-slider-react";
import '../../styles.css'



function FilterCard() {
  //caption to be shown in the range slider
  const arr = ["1-very low", "2-low", "3-medium", "4-high", "5-very high"]
  //values of slider
  const [minValue, set_minValue] = useState(1);
  const [maxValue, set_maxValue] = useState(5);
  //check uncheck for the five categories and statuses
  const [Family, setfamily] = useState(false)
  const [Shopping, setshoping] = useState(false)
  const [Education, seteducation] = useState(false)
  const [Work, setwork] = useState(false)
  const [all, setall] = useState(false)
  const [overdue, setOverdue] = useState(false)
  const [done , setDone] = useState(false)
  const [inProgress, setInProgress] = useState(false)
  const [canceled, setCanceld] = useState(false)
  const [allStatuses, setAllStatuses] = useState(false)
  const [upcoming,setUpcoming]=useState(false)

  //end results to be sent to the state of the hopage
  const [endResult, setendResult] = useState('')
  const [endStatus, setEndStatus] = useState('')
  

  
  
  const handleInput = (e) => {
	set_minValue(e.minValue);
	set_maxValue(e.maxValue);
  };
  const checkUncheck = () => {
    //do sth
    
  }
   const checkUncheckForAll = () => {
    //do sth
     seteducation(false)
     setwork(false)
     setshoping(false)
     setfamily(false)
     setall(!all)
    
   }
  
  const filterSender = (xyz) => {
  setendResult(xyz)
  }
  
  

  return (
      <div>
        <div className='flex flex-col items-center text-xl font-black'>
        <div className='bg-[#F9F2ED] flex  w-full h-11 justify-between items-center p-2 '>
        <div className='ml-6 mt-2 '>
          
    <Link to='/'><LeftArraw /> 
    </Link>
        </div> 
        <div className='text-center text-lg  justify-center mt-2 mr-6 lg:mr-10'>
         Filter
        </div>
          <div className='text-[#F87474] mr-6 text-lg hover:cursor-pointer'>
            <Link to='/' state={{
              url: 'filter',
              category: endResult,
              minValue: minValue,
              maxValue: maxValue,
              status:endStatus
              
            }}>
 Apply
            </Link>
         

        </div>
        
    </div>

          </div>  
          <div className='flex flex-col items-center text-start'>
              <div className='flex flex-col gap-4 w-72  mt-5 items-center text-start mb-10'>
                  
          <table className='w-72'>
            <tr className='mb-5'>
              <td className='text-lg font-medium mb-5'>Categories</td>
            </tr>
            <tr>
              <td
                onClick={() => {
                  filterSender("")
                  checkUncheckForAll()
                }}>
                <FilterCheckBox
                  atribute={"All"}
                  checkUncheck={checkUncheck}
                  tureFalse={all}
                />
              </td>
              <td
                onClick={() => {
                  
                  filterSender("Education")
                  seteducation(!Education)
                }}
              >
                <FilterCheckBox
                  atribute={"Education"}
                  tureFalse={Education}
                  checkUncheck={checkUncheck}
                />
              </td>
            </tr>
            <tr>
              <td
                onClick={() => {
                  filterSender("Work")
                  setwork(!Work)
                }}
              >
                <FilterCheckBox
                  atribute={"Work"}
                  tureFalse={Work}
                  checkUncheck={checkUncheck}
                />
              </td>
              <td
                onClick={() => {
                  filterSender("Shopping")
                  setshoping(!Shopping)
                }}
              >
                <FilterCheckBox
                  atribute={"Shopping"}
                  tureFalse={Shopping}
                  checkUncheck={checkUncheck}
                />
              </td>
            </tr>
            <tr>
              <td
                onClick={() => {
                  filterSender("Family")
                  setfamily(!Family)
                }}
              >
                <FilterCheckBox
                  atribute={"Family"}
                  tureFalse={Family}
                  checkUncheck={checkUncheck}
                />
              </td>
             
            </tr>
            
            
            
            
            
            
                      
                  </table>
                  
        </div>
        <table className='w-72 -mt-3 text-xl'>
          <tbody>
            <tr>
              <td>
 Priorities
              </td>
              <td>
 
              </td>
            </tr>
          </tbody>
        </table>
       
       
        <MultiRangeSlider
        minValue={minValue}
			  maxValue={maxValue}
			onInput={(e) => {
				handleInput(e);
          }}
          className='w-80 bg-[#C9B6A9] border-0 bg-opacity-0  ml-4 mt-3 text-base' min={1}
          max={5}
          step={1}
          style={{ border: 'none', boxShadow: 'none', textShadow:'none' }}
          ruler={false}
          label={true}
          labels={["l-very low","5-very high"]}
          barLeftColor="#C9B6A9"
          barInnerColor="#FFB562"
          barRightColor="#C9B6A9"
          thumbLeftColor="#F87474"
          thumbRightColor="#F87474"
          minCaption={arr[minValue - 1]}
          maxCaption={arr[maxValue - 1]}
          
          
          baseClassName='multi-range-slider'
        ></MultiRangeSlider>
         <div className='flex flex-col gap-4 w-72   items-center text-start mt-10'>
                  
          <table className='w-72'>
            <tr className='mb-2'>
              <td className='text-xl font-medium mb-5'>Statuses</td>
            </tr>
            <tr>
              <td
                onClick={() => {
                  setEndStatus("")
                  setAllStatuses(!allStatuses)
                }}
              >
                <FilterCheckBox
                  atribute={"All"}
                  checkUncheck={checkUncheck}
                  tureFalse={allStatuses}

                  
                />
              </td>
              <td
                onClick={() => {
                  setEndStatus("Overdue")
                  setOverdue(!overdue)
                }}
              >
                <FilterCheckBox
                  atribute={"Overdue"}
                  checkUncheck={checkUncheck}
                   tureFalse={overdue}
                />
              </td>
            </tr>
            <tr>
              <td
                onClick={() => {
                  setEndStatus("Upcoming")
                  setUpcoming(!upcoming)
                }}
              >
                <FilterCheckBox
                  atribute={"Upcoming"}
                  checkUncheck={checkUncheck}
                   tureFalse={upcoming}
                />
              </td>
              <td
                onClick={() => {
                  setEndStatus("Canceled")
                  setCanceld(!canceled)
                }}
              ><FilterCheckBox
                atribute={"Canceled"}
                  checkUncheck={checkUncheck}
                   tureFalse={canceled}
              />
              </td>
            </tr>
            <tr>
              <td
                onClick={() => {
                  setEndStatus("In progress")
                  setInProgress(!inProgress)
                }}
              >
                <FilterCheckBox
                atribute={"In progress"}
                  checkUncheck={checkUncheck}
                   tureFalse={inProgress}
              />
              </td>
              <td
                onClick={() => {
                  setEndStatus("Done")
                  setDone(!done)
                }}
              >
                <FilterCheckBox
                checkUncheck={checkUncheck}
                  atribute={"Done"}
                   tureFalse={done}
              />
              </td>
             
            </tr>
            
            
            
            
            
            
                      
                  </table>
                  
        </div>
          </div>
    </div>
  )
}

export default FilterCard