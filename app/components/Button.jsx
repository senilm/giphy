import React from 'react'

const Button = ({label,feature}) => {
  return (
    <div className='bg-black text-white px-3 py-2 rounded-xl flex justify-center items-center cursor-pointer' onClick={feature}>
      <div className='hover:scale-105 transition-all'>
      {label}
      </div>
    </div>
  )
}

export default Button