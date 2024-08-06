import React from 'react'

function Header({leading,trailing}) {
  return (
    <headers className='fixed w-full top-0 border-b-2 flex items-center' style={{height:'60px'}}>
      <div className='w-20'>
{leading}
      </div>
      <h1 className='text-4xl font-bold'>Pass Man</h1>
      <div className='ms-auto me-1'>
        {trailing}
      </div>
    </headers>
  )
}

export default Header