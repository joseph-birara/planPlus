import React from 'react'
import { Select, Option } from "@material-tailwind/react";

const SelectDropDown = () => {
  return (
    <div className="w-72">
      <Select placeholder='hello' className='border-2 border-red-500 plac pl-5' >
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>
  );
}

export default SelectDropDown