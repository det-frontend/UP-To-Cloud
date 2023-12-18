import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'swiper/css';
import "swiper/css/pagination";
import Homecards from '../components/Cards/Homecards';
import SaleSummary from '../assets/images/laptop-document-svgrepo-com (1).png'
import ChartBarChart from '../assets/images/chart-bar-chart-svgrepo-com.png'
import BarChartStand from '../assets/images/bars-chart-stand-svgrepo-com.png'
import ChartGraphic from '../assets/images/chart-graphic-svgrepo-com.png'
import GasStation from '../assets/images/gas-station-svgrepo-com.png'
import ShiftLeader from '../assets/images/gas-station-svgrepo-com-2.png'
import Category from '../assets/images/car-repair-car-svgrepo-com.png'
import Calender from '../assets/images/weekly-calendar-day-svgrepo-com.png';
import Speed from '../assets/images/speedometer-svgrepo-com.png';
import TankStock from '../assets/images/stockchart-svgrepo-com.png'
import Monitoring from '../assets/images/monitoring-seo-and-web-svgrepo-com.png';
import ATG from '../assets/images/tank-svgrepo-com.png'
import { MyanmarMainHomePage } from '../Language/Myanmar/myanmarMainHomePage';
import { EnglishMainHomePage } from '../Language/English/englishMainHomePage';
import Header from '../components/Header';
import { MdArrowBack } from 'react-icons/md';
import { ChinesehMainHomePage } from '../Language/Chinese/chineseMainHomePage';


function Home() {
  const user = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [language, setLanguage] = useState(EnglishMainHomePage);
  const location = useLocation();

  useEffect(() => {
    if (!user.login) {
      navigate("/");
    }

    if (user.language === "Myanmar" || user.language === "မြန်မာ") {
      setLanguage(MyanmarMainHomePage);
    } else if (user.language === "English" || user.language === "အင်္ဂလိပ်") {
      setLanguage(EnglishMainHomePage);
    
    } else if (user.language === "中国人" || user.language === "အင်္ဂလိပ်") {
      setLanguage(ChinesehMainHomePage);
    }

  }, [navigate, user]);

  const headerPaths = [
    '/kyawsan/main-con/home',
    // Add other paths where you want to show the header
  ];

  const shouldShowHeader = headerPaths.includes(location.pathname);

   const home = user.name !== "admin"?"home_page pb-[100px]  min-h-[90svh] items-center  flex justify-center ":"home_page items-center pb-[100px] min-h-[90svh]  flex justify-center "

  return (
    <>
      {shouldShowHeader?<Header/>:""}
    <div className={home} >
        {/* Daily Sale Report */}
      <div className='container px-3 mx-auto min-h-[75svh]'>
          <div className='data_input '>

            <h1 className=' font-bold  mt-[30px] flex justify-start items-center px-4 container mx-auto text-2xl  mb-[30px] text-white'>{language.reports}</h1>

          <div className='flex flex-wrap gap-3 justify-start items-start'>
            <div  className='w-[300px]'>
                 <Homecards title={language.daily_sale_report} img={ChartBarChart} buttontext={language.check_now} link={"/kyawsan/dailysalereport"} />  
            </div>
             {/* <div  className='w-[300px]'>
                 <Homecards title={language.daily_sale_categories_report} img={Category} buttontext={language.check_now} link={"/kyawsan/categoriesreport"}/>  
            </div>
                <div  className='w-[300px]'>
                 <Homecards title={language.online_monitoring_sale_report} img={Monitoring} buttontext={language.check_now} link={"/kyawsan/onlinemonitoringsalereport"}/>  
            </div>
              <div className='w-[300px]'>
                 <Homecards title={language.weekly_sale_report} img={Calender} buttontext={language.check_now} link={"/kyawsan/weekly"}/>  
            </div> */}
              {/* <div className='w-[300px]'>
                 <Homecards title={language.sale_summary_by_station} img={GasStation} buttontext={language.check_now} link={"/kyawsan/salessummarbystation"}/>  
            </div> */}
               {/* <div className='w-[300px]'>
                 <Homecards title={language.statement_report} img={ShiftLeader} buttontext={language.check_now} link={"/kyawsan/statementreport"}/>  
              </div>
                <div  className='w-[300px]'>
                 <Homecards title={language.tank_data} img={ATG} buttontext={language.check_now} link={"/kyawsan/real-tank"}/>  
            </div>
            <div className='w-[300px]'>
              <Homecards title={language.fuel_receive_report} img={BarChartStand} buttontext={language.check_now} link={"/kyawsan/fueldatareport"}/>     
            </div> */}
            {/* <div className='w-[300px]'>
                 <Homecards title={language.fuel_balance_report} img={Speed} buttontext={language.check_now} link={"/kyawsan/fuelbalance"}/>  
            </div> */}
             {/* <div  className='w-[300px]'>
                 <Homecards title={language.stock_balance_report} img={ChartGraphic} buttontext={language.check_now} link={"/kyawsan/tankbalancereport"}/>  
            </div>            */}
             {/* <div className='w-[300px]'>
              <Homecards title={language.fuel_type_balance} img={TankStock} buttontext={language.check_now} link={"/kyawsan/fueltypebalance"}/>  
            </div> */}
               {/* <div className='w-[300px]'>
              <Homecards title={language.daily_sale_summary_report} img={SaleSummary} buttontext={language.check_now } link={"/kyawsan/dailysalesummaryreport"}/>   
            </div> */}
           </div>

          <div className='flex justify-center my-3 items-center gap-3'>
          </div>
          <div className='flex justify-start my-3 items-center gap-3'>
           
            
             <div className='w-[25%]'>

            </div>
             <div className='w-[25%]'>

            </div>
          
          </div>
        </div>
    </div>
     </div>
    </>
  )
}

export default Home