import React from 'react'
import { Link } from 'react-router-dom'
import Warning from '../../Assets/IconCollection/Warning'
import Message from './Message'

function ConfirmationMessage(props) {
  return (
      <div className=' fixed absolute bg-[#000000] w-screen h-screen bg-opacity-50 z-40 top-0 bottom-0'>
      <Message item={props.item } setWarning={props.setWarning} />
          
    </div>
  )
}

export default ConfirmationMessage