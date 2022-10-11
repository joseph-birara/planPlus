import React from 'react'
const ProgressBar = ({ progressPercentage }) => {
    return (
        <div className='h-2 w-52 bg-[#F9F2ED] relative mr-0'>
            <div
                style={{ width: `${progressPercentage}%`}}
                className={`h-full 
                    bg-[#FFB562] `}>
            </div>
        </div>
    );
};
export default ProgressBar