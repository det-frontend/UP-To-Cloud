import React, {useRef,useState,useEffect  } from 'react'
import 'react-calendar/dist/Calendar.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// TankBalanceReport
import 'react-calendar/dist/Calendar.css';
import { LogoutUser } from '../redux/slices/LoginSlice';
import Loading from '../components/Loading';
import PageContainer from '../components/PageComponents/PageContainer';
import InputContainer from '../components/PageComponents/InputContainer';
import CalenderComponent from '../components/PageComponents/CalenderComponent';
import FuelTypeComponent from '../components/PageComponents/FuelTypeComponent';
import StationComponent from '../components/PageComponents/StationComponent';
import TankComponent from '../components/PageComponents/TankComponent';
import { FiSearch } from 'react-icons/fi';
import FuelBalanceReportTable from '../components/tables/FuelBalanceReport.table';
import { fetchFuelBalanceByTimeRange, getAllKyawSan027DailySaleReports, removeOldDats } from '../redux/slices/KyawSan027Slice';
import { FcInfo } from 'react-icons/fc';
import { EnglishFuelBalance } from '../Language/English/englishFuelBalanceReport';
import { MyanmarFuelBalanceRport } from '../Language/Myanmar/myanmarFuelBalanceReport';




let start = new Date();
start.setHours(0);
start.setMinutes(0);
start = new Date(start);

function FuelBalanceReport() {
  const user = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const tableRef = useRef();
  const [loading, setloading] = useState(false)
  const [okData, setOkData] = useState()
  const [calenderOne, setCalenderOne] = useState(start);
  const [fuelType, setFuelType] = useState({name: "All", code: "Please"});
  const [tankName, setTankName] = useState({name: "All", code: "Please"});
  const [selectedStation, setSelectedStation] = useState({name: "All", code: "Please"});
  const [language, setLanguage] = useState(EnglishFuelBalance);
  const [isSelectedStation, setIsSelectedStation] = useState(false);
  const datas = useSelector(getAllKyawSan027DailySaleReports);

 


  useEffect(() => {
    if (!user.login) {
      navigate("/");
    }
      if (user.language === "Myanmar" || user.language === "မြန်မာ") {
      setLanguage(MyanmarFuelBalanceRport);
    } else if (user.language === "English" || user.language === "အင်္ဂလိပ်") {
      setLanguage(EnglishFuelBalance);
    }
    dispatch(removeOldDats());
    return () => {
      dispatch(removeOldDats())
    }
  }, [navigate, user, dispatch]);

  const handleClick = () => {
       if (calenderOne) {
        if (selectedStation.code === "Please") {
          setIsSelectedStation(true);
        } else {
          setloading(true);
          setIsSelectedStation(false);
     
          const fetchData = async () => {
       
            const bomb = [user.token, calenderOne, selectedStation,fuelType,tankName];
            setloading(true);
            await dispatch(fetchFuelBalanceByTimeRange(bomb));
            setloading(false);
          }
          fetchData();
        }
      }


    }
 
    useEffect(() => {
        if (datas === "error") {
          dispatch(LogoutUser());
        }
      if (datas?.result?.length > 0) {
    let pureArray = [...datas.result]; // Create a shallow copy of the array
    pureArray.sort((a, b) => a.tankNo - b.tankNo); // Sort the new array
    setOkData(pureArray); // Update the state with the new sorted array
       
    } else {
      setOkData([])
    }
     
    }, [datas, dispatch]);
  
 



    
  return (
 <PageContainer language={false}  title={language.main_title}>
      <InputContainer>
        <div className="flex flex-wrap gap-[20px]">
        <CalenderComponent title={language.date} value={calenderOne} setValue={setCalenderOne} />
        <FuelTypeComponent title={language.fuel_type} value={fuelType} setValue={setFuelType} />
        <TankComponent language={language.tank_no} value={tankName} setValue={setTankName} /> 
        <StationComponent title={language.station} value={selectedStation} setValue={setSelectedStation} />
       
        </div>  
         {
          isSelectedStation && <div className='flex mt-3 animate-[translate-y-6]   duration-200 text-blue-500 gap-[10px] justify-start text-[16px] items-center'><FcInfo/> Please Select Station</div>
        }
        <div className="flex-2">
          <button onClick={handleClick} className="w-[120px] h-[40px] text-md mt-3 bg-blue-900 flex items-center justify-center gap-2 uppercase text-white rounded-sm hover:bg-blue-800"><FiSearch className=" scale-150"/>{language.search}</button>
          </div>
       </InputContainer>
                
     
      {
        okData?.length > 0 ? <>
          {/* <FuelBalanceTable okData={okData} tableRef={tableRef} setOkData={setOkData} /> */}
          <FuelBalanceReportTable language={language} tableRef={tableRef} okData={okData}/>
        </> : ""
       }
              
     
     {
        loading?<Loading/>:''
      }
    </PageContainer>
  )
}

export default FuelBalanceReport