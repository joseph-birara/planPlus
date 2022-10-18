import React from 'react'
const ProgressBar = ({ progressPercentage }) => {
    return (
        <div className='h-2 w-52 bg-[#F9F2ED] text-center rounded-full'>
            <div
                style={{ width: `${progressPercentage}%`}}
                className={`h-full 
                    bg-[#FFB562] rounded-full`}>
            </div>
        </div>
    );
};
export default ProgressBar