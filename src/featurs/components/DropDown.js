
import upArrow from '../../Assets/AcountIcons/iconArrowUp.svg'
import downArrow from '../../Assets/AcountIcons/iconArrowDown.svg'
import rightAtOptionButton from '../../Assets/IconCollection/rightAtOptionButton.svg'

const DropDown = (props) => {
    
    
    
    return (
        <div
            
            className='relative'>
            <div
                //swichs the dropwon up and down
                //tata is just true false value to swich 
                onClick={()=>props.swichTata()}
                className={`w-[150px] ${props.h !==undefined?`h-${props.h}`:'h-10 p-4'} h-10 bg-[#F9F2ED] rounded-lg  p-2 ${props.tata ? 'rounded-b-none border-b-[1px] border-[#8f8686]' : ''}`}>
                <span
                    //place holder and real value
                    className={`${props.realValue ? 'text-base opacity-100' : 'text-sm text-gray-600'}`}>
                    {props.realValue?props.realValue:props.place}
                    
                </span>
                {/* {this is the up and down arrow} */}
                <img className='ml-28 -mt-4 h-[8px]' src={!props.tata?downArrow:upArrow} alt='icon'/>
          
          
            </div>
            
           { props.tata?<div className='absolute top-10 bg-[#F9F2ED] w-[150px] p-2 rounded-lg rounded-t-none z-20'>
                {
                    //those are the options
              props.data.map((x,index )=> <div
                  onClick={() => {
                      //onchange function
                      props.setValuesOfSelect(x)
                      props.swichTata()
                       
                  }}
                  key={index}
                  className="mb-1 hover:cursor-pointer"
                 
              >
                  {x}
                 <div className={`w-[14px] h-[14px] rounded-[6px] bg-[#FFB562] pt-1 ml-[105px] -mt-[19px] ${props.realValue!==x?'hidden':''}`}>
                      <img className='text-white ml-[3px] -mt-[2px]' src={rightAtOptionButton} alt='right'/>
                  </div>
                 
              </div>)
          }
            </div> :'' }       
      </div>
      
  )
}

export default DropDown