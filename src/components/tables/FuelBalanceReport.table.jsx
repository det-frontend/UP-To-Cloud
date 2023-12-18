import React, { useRef } from 'react'
import { RiFileExcel2Fill } from 'react-icons/ri';
import { AiFillPrinter } from 'react-icons/ai';
import { useReactToPrint } from 'react-to-print';
import { useDownloadExcel } from 'react-export-table-to-excel';

function FuelBalanceReportTable({ okData,tank,language }) {
  const tRef = useRef();


  const handlePrint = useReactToPrint({
    content: () => tRef.current,
  });



   const { onDownload } = useDownloadExcel({
    currentTableRef: tRef.current,
    filename: `Fuel Balance Report`,
    sheet:  `Fuel Balance Report`
  })

  return (
    <>
      <div className='mb-[150px]'>
              <table ref={tRef} className='mt-[40px]'>
            <thead>
               <tr>
              <th>{language.station}</th>
     <th className='w-[150px]'>{language.tank}</th> 
        <th>{language.fuel_type}</th>      
        <th className='w-[100px]'>{language.capacity}</th>
        <th className='w-[150px]'>{language.opening}</th>
        <th>{language.receive_volume} ({language.liter})</th>
        <th>{language.receive_volume} ({language.gallon})</th>
        <th className='w-[150px]'>{language.sale}</th>
        <th className='w-[150px]'>{language.balance}</th>
                </tr>    
            </thead>
        
       {
        okData.map((ok,index) => (
            <tr key={index}>
            <td className='text-left'>{ok.stationId.name}</td>
        <td className='text-left'>Tank {ok.tankNo}</td> 
            <td className='text-left'>{ok.fuelType}</td>
                <td className='text-left'>{ok.capacity}</td>
                <td className='text-right'>{ok.opening?.toFixed(3)}</td>
                <td className='text-right'>{ok.fuelIn === 0?"-":ok.fuelIn?.toFixed(3)}</td>
                <td className='text-right'>{ok.fuelIn === 0?"-":(ok.fuelIn / 4.546)?.toFixed(3)}</td>
                <td className='text-right'>{(ok.cash)?.toFixed(3)}</td>
                <td className='text-right'>{ok.balance?.toFixed(3)}</td>
            </tr>
        ))
       }         
              </table>
        {/* <p className='flex justify-end mt-[30px] underline px-[100px] hover:font-semibold'><Link className='flex gap-3 items-center hover:gap-5 duration-300' to="/kyawsan/tankdemo">Check with Model <AiOutlineArrowRight/></Link></p> */}
         <div className='flex text-[16px] p-3 mt-[30px] mb-[50px] items-center justify-start gap-3'>
          <button onClick={() => onDownload()} className='flex items-center justify-center gap-2 text-md' >{language.toExcel}<RiFileExcel2Fill size={30} /></button>
          <button onClick={handlePrint} className='flex items-center justify-center gap-2 text-md' >{language.toPrint}<AiFillPrinter size={30}/></button>
          </div>
            </div>

    </>
  )
}

export default FuelBalanceReportTable