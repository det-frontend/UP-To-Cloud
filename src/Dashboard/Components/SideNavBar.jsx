import React from 'react'
import Profile from './SideBarComponents/Profile'
import Items from './SideBarComponents/Items/Items'
import { HiMenu } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { FcCancel } from 'react-icons/fc';
function SideNavBar({setFuelIn,setIsMenu,isMenu,data,setData}) {

  return (
    <div className={` p-3 duration-100  bg-white drop-shadow-xl ease-linear h-[89svh] sticky bottom-0 left-0 top-[65px] ${isMenu?'w-[150px] ':'lg:w-[70px] w-[50px] '}`}>
      
      <p onClick={() => setIsMenu((prev) => !prev)} className=' mt-[50px] hover:rounded duration-500 hover:shadow  text-3xl cursor-pointer'>
        {
          isMenu?<RxCross2 className='mx-auto'/>:<HiMenu className='mx-auto'/>
        }
      </p>
      {/* <Profile isMenu={isMenu} /> */}
      <Items setFuelIn={setFuelIn} isMenu={isMenu} />
      {
        data !== false ?<div onClick={()=>setData(false)} className=' bg-red-200 rounded hover:bg-red-400 hover:drop-shadow-md cursor-pointer h-[50px] flex items-center justify-center'><FcCancel className=' scale-[2]'/></div>:''
      }
    </div>
  )
}

export default SideNavBar 