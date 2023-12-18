import React from 'react'
import { Link } from 'react-router-dom';


export const PprdchooseCard = ({ img, title, route }) => {


  return (
    <Link to={route} className='w-[23%]  p-2 shadow-md bg-white border-gray hover:drop-shadow-md duration-300 cursor-pointer  h-[300px]'>
          <div className=' bg-slate-200 p-5 flex justify-center items-center'>
          <img className='w-[60%]' src={img} alt='kd' />
    </div>
          <div className='mt-5'>
          <h3 className=' text-xl font-extrabold'>{title}</h3>
          </div>
    </Link> 
  )
}
