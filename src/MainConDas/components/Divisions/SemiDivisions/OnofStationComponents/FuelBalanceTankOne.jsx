import React from 'react'
import Steel from '../../../../../assets/images/steelTank.jpeg'

function FuelBalanceTankOne({title = "000.000"}) {
  return (
    <div className=' border-[1px] hover:drop-shadow-lg w-[23.33%] p-5  flex flex-col justify-around duration-500 items-center h-[220px] bg-[white] relative'>
          <p className=' text-center mb-3 mt-3 font-extrabold text-[14px]'>Tank 1 (005-Premium Diesel)</p>
          <img className='' src={Steel}  alt='Steel' />
          <p className='w-[40%] top-[53%] bg-black text-white text-center px-1 py-1 absolute'>{title}</p>
    </div>
  )
}

export default FuelBalanceTankOne