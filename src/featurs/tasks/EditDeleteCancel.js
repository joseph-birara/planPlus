import React from 'react'

function EditDeleteCancel(props) {
  return (
    <div className='editDeleteCancel'>
      <div className='m-2'>
        <div
          onClick={props.parent.status ='canceld'}
          className='bg-[#F9F2ED] mb-2'>
              Cancel
          </div>
          <div  className='bg-[#F9F2ED] mb-2'>
             Edit
          </div>
        <div
          className='bg-[#F9F2ED]'>
              Delete
          </div>

      </div>
          
          
    </div>
  )
}

export default EditDeleteCancel