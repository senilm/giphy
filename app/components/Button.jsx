import React from 'react'

const Button = ({label,feature}) => {
  return (
    <div className='bg-black text-white px-3 rounded-xl flex justify-center items-center cursor-pointer' onClick={feature}>{label}</div>
  )
}

export default Button