import React from 'react'

const Button = ({label,feature}) => {
  return (
    <div className='bg-black max-md:py-1 max-lg:text-xs text-white lg:px-3 lg:py-2 max-lg:p-1 rounded-xl flex justify-center items-center cursor-pointer' onClick={feature}>
      <div className='hover:scale-105 transition-all'>
      {label}
      </div>
    </div>
  )
}

export default Button