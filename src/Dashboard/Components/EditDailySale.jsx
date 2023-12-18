import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PurposeOfUseComponent from '../../components/PageComponents/PurposeOfUseComponent';
import { RiEdit2Fill } from 'react-icons/ri';
import {BsCloudUploadFill} from 'react-icons/bs'
function EditDailySale({ currentData, stationName, tableRef, language,data,handleEdit,purposeOfUse,setPurposeOfUse,setCarNo,carNo,handleUpToCloud}) {

    const [who, setWho] = useState();

  const user = useSelector((state) => state.login);
  

 
  useEffect(() => {
    setWho(user.name);
  },[user])

  return (
      <>
       <div class=" mt-[50px] ">
  <table ref={tableRef} class="text-xs lg:text-md bg-white report-table">
      <thead>
      <tr>
      <th>{language.vocono}</th>
      <th>{language.sale_date_time}</th>
      <th>{language.vehicle_no}</th>
      <th>{language.purpose_of_use}</th>
      <th>{language.nozzle_no}</th>
      <th>{language.fuel_type}</th>
      <th>{language.sale_liter}</th>
      <th>{language.sale_price}</th>
      <th>{language.total_price}</th>
      <th>{language.totalizer_liter}</th>
      <th>{language.totalizer_amount}</th>
      <th>Actions</th>
    {
      who === "admin"?<>  <th>Device</th>
      <th>Error</th></>:<></>
    }

    </tr>
    </thead>
          <tbody>
                      {
              currentData.map((object, index) => {
             
            // const date = new Date(object.createAt);
                // const date = new Date(object.createAt);
            
              
              
                // const formattedDate = `${date.getDate()}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


                const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dateObj = new Date(object.createAt);
  const day = dateObj.getUTCDate();
  const month = months[dateObj.getUTCMonth()];
  const year = dateObj.getUTCFullYear();
  const time = dateObj.toISOString().slice(11, 19);
         
  const formattedDate = `${day}-${month}-${year} ${time}`;

              return <tr className={`${data === object._id ? 'bg-blue-300':'bg-none'}`}  key={index}>
                {/* <th>{object.stationDetailId.}</th>
                 */}
                <td className='h-[50px]'>{object.vocono}</td>
                <td>{formattedDate}</td>
                {/* <td>{object.carNo}</td> */}
                <td>{data === object._id ?<input  className='border-[1px] px-3 border-black w-[90px] rounded-md h-[50px]' onChange={(e)=>setCarNo(e.target.value)} value={carNo}/>:object.carNo}</td>
                <td>{data === object._id ?
                  <PurposeOfUseComponent title='' purposeOfUse={purposeOfUse} setValue={setPurposeOfUse} /> : object.vehicleType}</td>
                <td>{object.nozzleNo}</td>
                <td>{object.fuelType}</td>
                {/* <td className=' text-right'>{((parseFloat(object?.saleLiter)/4.16)).toFixed(3)}</td> */}
                <td className='text-right'>{object.saleLiter}</td>
                <td className='text-right'>{object.salePrice.toLocaleString(undefined, { maximumFractionDigits: 3 })}</td>
                <td className='text-right'>{object.totalPrice.toLocaleString(undefined, { maximumFractionDigits: 3 })}</td>
                <td className='text-right'>{object.totalizer_liter?.toFixed(3)}</td>
                <td className='text-right'>{object.totalizer_amount.toLocaleString(undefined, { maximumFractionDigits: 3 })}</td>
                <td  className={` relative hover:drop-shadow-md text-center cursor-pointer hover:text-white ${data === object._id?'bg-green-400 hover:bg-green-500':'bg-gray-300 hover:bg-gray-400'}`}>
                {
                    data=== object._id? <div onClick={handleUpToCloud} className='absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center'><BsCloudUploadFill className='scale-125 mx-auto' /></div>:<div onClick={()=>handleEdit(object)} className='absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center'><RiEdit2Fill className='scale-125 mx-auto'/></div>
                }
                </td>
            {
                  who === "admin"?<>    <td className='text-left text-xs uppercase '>{object.device}</td>
                <td className={`text-right ${object.isError?"bg-red-300":"bg-green-300"}`}>{object.isError?"True":"False"}</td></>:<></>
            }
              </tr>
            })
    }
   </tbody>
  </table>
</div>
      </>

  )
}

export default EditDailySale