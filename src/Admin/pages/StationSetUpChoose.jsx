import React from 'react'
import AdminCard from '../components/AdminCard'
import GGIMG from '../../assets/images/gas-station-fuel-svgrepo-com.png';


export const StationSetUpChoose = () => {
  return (
    <div className='container mx-auto py-[150px]'>
      <h3 className='container mx-auto text-[5vh] mb-[20px] font-extrabold'>Station SetUp</h3>

      <div className='flex justify-start gap-5 items-center'>
        <AdminCard link={`/admin/station-set-up?name=kyaw_san`} width={"w-[32.2%]"} img={GGIMG} title={"Kyaw San"}/>
        <AdminCard link={`/admin/station-set-up?name=common`} width={"w-[32.2%]"} img={GGIMG} title={"Common"}/>
      </div>
    </div>
  )
}
