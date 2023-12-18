import React from 'react'
import { Link } from 'react-router-dom'
import GGIMG from '../../assets/images/gas-station-fuel-svgrepo-com.png';
import AdminCard from '../components/AdminCard';

function AccountAd() {
  return (
    <div className='container mx-auto py-[150px]'>
      <h3 className='container mx-auto text-[5vh] mb-[20px] font-extrabold'>Station Accounts</h3>
      <div className='flex items-center justify-center'>
      <AdminCard link={'/admin/account/details?collectionId=64e857fabb44c05999793143&name=kyaw_san'}  width={"w-[32.2%]"} img={GGIMG} title={"Kyaw San"}/>
      <AdminCard link={'/admin/account/details?collectionId=64e9660e981a612a570cac13&name=common'} width={"w-[32.2%]"} img={GGIMG} title={"Common"}/>
      <AdminCard width={"w-[32.2%]"} img={GGIMG} title={"Coming Soon!"}/>
      </div>
    </div>
  )
}

export default AccountAd