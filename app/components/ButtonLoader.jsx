import { ColorRing } from 'react-loader-spinner'

const ButtonLoader = () => {
    return (
        <div className='w-full flex justify-center '>
            <ColorRing
      visible={true}
      height="24"
      width="30"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
    />
        </div>
      )
}

export default ButtonLoader