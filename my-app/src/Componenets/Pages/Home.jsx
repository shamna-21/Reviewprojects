import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function Home() {
    const navigate =useNavigate()
    function handleclick(params) {
        navigate('/contactform')
    }
  return (
    <div>
        <div className='m-20'>
      <button className='bg-gray-500 rounded-md text-white w-32 h-8' onClick={handleclick}>ADD CONTACT</button>
     
    </div>
    <Outlet/>
    </div>
  )
}

export default Home
