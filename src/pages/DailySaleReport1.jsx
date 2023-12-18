import React, { useState,useEffect,useRef } from "react";
import PageContainer from "../components/PageComponents/PageContainer";
import InputContainer from "../components/PageComponents/InputContainer";
import CalenderComponent from "../components/PageComponents/CalenderComponent";
import PurposeOfUseComponent from "../components/PageComponents/PurposeOfUseComponent";
import NozzleComponent from "../components/PageComponents/NozzleComponent";
import FuelTypeComponent from "../components/PageComponents/FuelTypeComponent";
import Loading from "../components/Loading";
import { LogoutUser } from "../redux/slices/LoginSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { AiFillPrinter } from 'react-icons/ai';
import StationComponent from "../components/PageComponents/StationComponent";
import { FiSearch } from 'react-icons/fi'
import { fetchDailySaleReportPagination, fetchDailySaleReports, getAllKyawSan027DailySaleReports, removeOldDats } from "../redux/slices/KyawSan027Slice";
import { FcInfo } from 'react-icons/fc';
import DailySaleReportTable from "../components/tables/DailySaleReport.table";
import PaginatorComponent from "../components/PageComponents/PaginatorComponent";
import { englishDailySaleReport } from "../Language/English/englishDailySaleReport";
import { myanmarDailySaleReport } from "../Language/Myanmar/myanmarDailySaleReport";
import { title } from "process";
import Header from "../components/Header";
import UseGet_1 from "../MainConDas/components/hooks/UseGet_1";


let start = new Date();
start.setHours(0);
start.setMinutes(0);
start = new Date(start);

let end = new Date();
end.setHours(23);
end.setMinutes(0);
end = new Date(end);


export default function DailySaleReportOne() {
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
  const [{data_get_1,loading_get_1,error_get_1},getIt_1] = UseGet_1();

  const user = useSelector((state) => state.login);
  const datas = useSelector(getAllKyawSan027DailySaleReports);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (!user.login) {
      navigate("/");
    }
    if (user.language === "Myanmar" || user.language === "မြန်မာ") {
      setLanguage(myanmarDailySaleReport);
    } else if (user.language === "English" || user.language === "အင်္ဂလိပ်") {
      setLanguage(englishDailySaleReport);
    }
    dispatch(removeOldDats())
      return () => {
         dispatch(removeOldDats())
        } 
  }, [user, navigate, dispatch]);
  
  useEffect(() => {
    getIt_1(`/detail-sale/pagi/by-date/1?sDate=${startDate}&eDate=${endDate}`,user.token);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data_get_1.result) {
      setOkData(data_get_1.result);
       setTotalLength(data_get_1.totalCount);
    }
  }, [data_get_1,loading_get_1,error_get_1]);


  const handleClick = () => {
        const fetchData = async () => {
          
        const bomb = [user.token, selectedFuelType.code, selectedNozzle.code, startDate, endDate,false,selectedNodeKeys.code];
        
        setloading(true);
        await dispatch(fetchDailySaleReports(bomb));
        setloading(false);
    }
    fetchData();
}

   useEffect(() => {
        if (datas === "error") {
          dispatch(LogoutUser());
        }
    if (datas?.result?.length > 0) {
      setOkData(datas.result);
      setTotalLength(datas.totalCount);
    }
     
   }, [datas, dispatch]);
  
  
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

  
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

   const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Daily Sale Report",
    sheet: "Daily Sale Report"
   })
  
  


    return (
    <>
      <PageContainer language={false} value={language} setValue={setLanguage} title={language.main_title}>
        <InputContainer>
          <div className="flex  flex-wrap gap-[20px]">
            <CalenderComponent value={startDate} setValue={setStartDate} title={language.start_date} />
            <CalenderComponent value={endDate} setValue={setEndDate}  title={language.end_date} />
            <PurposeOfUseComponent title="Purpose of Use" value={selectedNodeKeys} setValue={setSelectedNodeKeys}/>
            <NozzleComponent title={language.nozzle_no} value={selectedNozzle} setValue={setSelectedNozzle} />
            <FuelTypeComponent title={language.fuel_type} value={selectedFuelType} setValue={setSelectedFuelType} />
            {/* <StationComponent title={language.station} value={selectedStation} setValue={setSelectedStation} /> */}
          </div>
           {
            isSelectedStation && <div className='flex animate-[translate-y-6]   duration-200 text-blue-500 gap-[10px] justify-start text-[16px] items-center'><FcInfo/> Please Select Station</div>
           }
          <div className="flex-2">
            <button onClick={handleClick} className="w-[120px] h-[40px] mt-2 text-md  bg-blue-900 flex items-center justify-center gap-2 uppercase text-white rounded-sm hover:bg-blue-800"><FiSearch className=" scale-150" /> {language.search}</button>
          </div>
        </InputContainer>
          {
          okData.length > 0 && <>
            <DailySaleReportTable language={language} stationName={selectedStation.name} tableRef={tableRef} currentData={okData} />
            <PaginatorComponent language={language} totalLength={totalLength} onPageChange={onPageChange} first={first} rows={rows} />
            <div className='flex p-3  text-[16px] mt-[10px] mb-[50px] items-center justify-start gap-3'>
              <button onClick={() => onDownload()} className='flex items-center justify-center gap-2 text-md' >{language.toExcel}<RiFileExcel2Fill size={30} /></button>
              <button onClick={handlePrint} className='flex items-center justify-center gap-2 text-md' >{language.toPrint}<AiFillPrinter size={30} /></button>
            </div>
          </> 
      }
       
      {
        loading?<Loading/>:''
      }
         </PageContainer>
    </>
    )
}
    