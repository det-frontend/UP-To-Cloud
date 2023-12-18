import React, { useEffect, useRef, useState } from 'react'
import PageContainer from '../../components/PageComponents/PageContainer'
import InputContainer from '../../components/PageComponents/InputContainer'
import CalenderComponent from '../../components/PageComponents/CalenderComponent'
import NozzleComponent from '../../components/PageComponents/NozzleComponent'
import FuelTypeComponent from '../../components/PageComponents/FuelTypeComponent'
import { FiSearch } from 'react-icons/fi'
import DailySaleReportTable from '../../components/tables/DailySaleReport.table'
import PaginatorComponent from '../../components/PageComponents/PaginatorComponent'
import { englishDailySaleReport } from '../../Language/English/englishDailySaleReport'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { myanmarDailySaleReport } from '../../Language/Myanmar/myanmarDailySaleReport'
import EditDailySale from './EditDailySale'
import StationComponent from '../../components/PageComponents/StationComponent'
import { fetchDailySaleReportPagination, fetchDailySaleReports, getAllKyawSan027DailySaleReports } from '../../redux/slices/KyawSan027Slice'
import { LogoutUser } from '../../redux/slices/LoginSlice'
import UseGet_1 from '../../MainConDas/components/hooks/UseGet_1'
import UsePost_11 from '../../MainConDas/components/hooks/UsePost_11'

let start = new Date();
start.setHours(0);
start.setMinutes(0);
start = new Date(start);

let end = new Date();
end.setHours(23);
end.setMinutes(0);
end = new Date(end);

export const UpToCloud = ({data,setData}) => {
const [endDate, setEndDate] = useState(end)
  const [startDate, setStartDate] = useState(start);
  const [selectedNodeKeys, setSelectedNodeKeys] = useState({name: "All", code: "Please"});
  const [selectedNozzle, setSelectedNozzle] = useState({name: "All", code: "Please"});
  const [selectedFuelType, setSelectedFuelType] = useState({name: "All", code: "Please"});
  const [selectedStation, setSelectedStation] = useState({ name: "All", code: "Please" });
  const [isSelectedStation, setIsSelectedStation] = useState(false);
  const [language, setLanguage] = useState(englishDailySaleReport);
  const [loading, setloading] = useState(false)
  const [okData, setOkData] = useState([])
  const tableRef = useRef();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(50);
  const [totalLength, setTotalLength] = useState(0);
  const [stationCode, setStationCode] = useState('');


  const [vehicleNo, setVehicleNo] = useState('');
  const [purposeOfUse, setPurposeOfUse] = useState({ name: 'Cycle', code: 'Cycle' });
  const user = useSelector((state) => state.login);
  const datas = useSelector(getAllKyawSan027DailySaleReports);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [{data_get_1,loading_get_1,error_get_1},getIt_1] = UseGet_1();
  const [{data_p_11,loading_p_11,error_p_11},fetchIt_11] = UsePost_11();

  
  useEffect(() => {
    if (!user.login) {
      navigate("/");
    }
    if (user.language === "Myanmar" || user.language === "မြန်မာ") {
      setLanguage(myanmarDailySaleReport);
    } else if (user.language === "English" || user.language === "အင်္ဂလိပ်") {
      setLanguage(englishDailySaleReport);
    }
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, dispatch]);

    
  useEffect(() => {
    getIt_1(`detail-sale/pagi/1?asyncAlready=a`,user.token);
  }, []);
  
  useEffect(() => {
    if (data_get_1.result) {
      setOkData(data_get_1.result);
       setTotalLength(data_get_1.totalCount);
    }
  },[data_get_1,loading_get_1,error_get_1]);
    

const handleClick = () => {
  const fetchData = async () => {
  let async = true;
            // const bomb = [user.token,selectedFuelType.code, selectedNozzle.code, startDate, endDate,async];
            // setloading(true);
            // await dispatch(fetchDailySaleReports(bomb));
           
            let nozzleRoute = selectedNozzle.code === "Please" ? '' : `&nozzleNo=${selectedNozzle.code}`;
            let fuelTypeRoute = selectedFuelType.code === "Please" ? '' : `&fuelType=${selectedFuelType.code}`;
           
            getIt_1(`detail-sale/pagi/1?asyncAlready=a${nozzleRoute}${fuelTypeRoute}`,user.token)
            // getIt_1(`detail-sale/pagi/1?asyncAlready=a`,user.token);
            setloading(false);
            }
            fetchData();
  };

   useEffect(() => { 
    if (datas === "error") {
          dispatch(LogoutUser());
    }
    if (datas?.result?.length > 0) {
      setOkData(datas.result);
      setTotalLength(datas.totalCount);
    }
     
   }, [datas, dispatch]);
    
  const handleUpToCloud = (e) => {
    fetchIt_11(`detail-sale/ap-update?_id=${stationCode}`, { vehicleType: purposeOfUse.code, carNo: vehicleNo }, user.token);
  }
  
  useEffect(() => {
    if (data_p_11.con) {
      setData(false);
       getIt_1(`detail-sale/pagi/1?asyncAlready=a`,user.token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data_p_11,loading_p_11,error_p_11])
    
    const handleEdit = (e) => {
    setStationCode(e._id);
    setVehicleNo(e.carNo);
    setPurposeOfUse(e.vehicleType);
    setData(prevData => {
            return prevData === e._id ? 11 : e._id
    })
    };

   const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
         
        const pageNo = event.page + 1;

        const fetchData = async () => {
        const bomb = [pageNo,user.token,startDate,endDate, selectedFuelType.code, selectedNozzle.code];
        
        setloading(true);
        await dispatch(fetchDailySaleReportPagination(bomb));
       setloading(false);
    }
    fetchData();
    };


  return (
    <>
       <div className=' w-[calc(100%-70px)]  dashboard-right mx-auto h-[88svh] overflow-y-scroll '>
         <InputContainer>
        <div className='flex flex-wrap gap-[20px]'>
            {/* <CalenderComponent value={startDate} setValue={setStartDate} title={language.start_date}/>
            <CalenderComponent value={endDate} setValue={setEndDate} title={language.end_date}/> */}
            <NozzleComponent value={selectedNozzle} setValue={setSelectedNozzle} title={language.nozzle_no}/>
            <FuelTypeComponent  title={language.fuel_type} value={selectedFuelType} setValue={setSelectedFuelType}/>
        </div>
        <div className="flex-2">
            <button onClick={handleClick} className="w-[110px] h-[40px] mt-2 text-xs bg-blue-900 flex items-center justify-center gap-2 uppercase text-white rounded-sm hover:bg-blue-800"><FiSearch className="scale-150" /> {language.search}</button>
        </div>
        </InputContainer>
       <div className='bg-white'>
        {
        okData.length > 0 && <>
         <EditDailySale 
         handleUpToCloud={handleUpToCloud}
         carNo={vehicleNo}
         setCarNo={setVehicleNo}
         purposeOfUse={purposeOfUse} 
         setPurposeOfUse={setPurposeOfUse}
         handleEdit={handleEdit} data={data} language={language} currentData={okData} />
        <PaginatorComponent language={language} totalLength={totalLength} onPageChange={onPageChange} first={first} rows={rows}/>
        </>
       }
       </div>
       </div>
    </>
  )
}
