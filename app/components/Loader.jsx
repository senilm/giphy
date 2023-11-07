import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='w-full flex justify-center min-h-screen'>
        <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#000000', '#000000', '#000000', '#000000', '#000000']}
/>
    </div>
  )
}

export default Loader