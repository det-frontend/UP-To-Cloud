import React from 'react'
import Header from './components/Header'
import { Route,Routes,useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import DailySaleReportOne from './pages/DailySaleReport1'
import FuelInDailyReport from './pages/Lap'
import DailyThisDay from './pages/DailyThisDay.report'
import SearchReports from './pages/SearchReports'
import TankBalanceReport from './pages/TankBalanceReport'
import StatementReport from './pages/StatementReport'
import OnlineMonitoringSaleReport from './pages/OnlineMonitoringSaleReport'
import DailySaleCategoriesReport1 from './pages/DailySaleCategoriesReport1'
import WeeklySaleReport from './pages/WeeklySaleReport'
import FuelBalanceReport from './pages/FuelBalanceReport'
import Adjustment from './pages/Adjustment'
import TankBalance from './pages/TankBalance'
import FuelTypeBalanceReport from './pages/FuelTypeBalanceReport'
import Test from './pages/Test'
import UserManual from './components/UserManual/UserManual'
import Dashboard from './Dashboard/Dashboard'
import DailySummaryByStationReport from './pages/DailySummeryByStationReport'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'
import MainConDas from './MainConDas/MainConDas'
import MainConDasHeader from './MainConDas/components/Header/MainConDasHeader'
import BackToDash from './Dashboard/Components/BackToDash'
import HomePageAd from './Admin/pages/HomePageAd'
import AdminHeader from './Admin/components/AdminHeader'
import AccountAd from './Admin/pages/AccountAd'
import StationsAdmin from './Admin/pages/StationsAdmin'
import DashBoardAd from './Admin/pages/DashBoardAd'
import StationSetUpAd from './Admin/pages/StationSetUpAd'
import DetAdminHome from './Admin/pages/DetAdminHome'
import NavigationHeaderCon from './Controller/NavigationHeaderCon'
import RealTimeTank from './pages/RealTimeTank'
import AccountDetails from './Admin/pages/AccountDetails'
import StationBanned from './Admin/pages/StationBanned'
import { Pprdchoose } from './pages/Pprdchoose'
import { AddCollections } from './Admin/pages/AddCollections'
import { ChooseStationCollections } from './Admin/pages/ChooseStationCollections'
import { StationSetUpChoose } from './Admin/pages/StationSetUpChoose'



function Routerdo() {
  const user = useSelector((state) => state.login);
  const location = useLocation();





  const headerPaths = [
    '/kyawsan/main-con/dash',
    '/user/choose',
    '/usermanual'
    // Add other paths where you want to show the header
  ];

  const shouldShowHeader = headerPaths.includes(location.pathname);


   

 


  return (
    <>
     {(() => {
      switch (user.name) {
        case 'manager':
          return <Header />;
        case 'admin':
          return <AdminHeader />;
        case 'kyaw san':
          if (shouldShowHeader) {
            return ""
          } else {
             return <Header/>
          }
        case 'pprd':
          if (shouldShowHeader) {
            return <Header show={false} />
          } else {
            return <Header/>
          }
        default:
          return <Header/>;
      }
    })()}
      {/* {
        shouldShowHeader? <MainConDasHeader/> : <AdminHeader/>
      } */}
      {/* <MainConDasHeader/> */}

      {/* <NavigationHeaderCon value={null}/> */}
      <Routes>
        <Route  path='/' element={<Login/>}></Route> 
        {/* <Route path='/kyawsan/home' element={<Home />}></Route> */}
        {/* {
          user.stationId && <Route path={`/${user.stationId}/home`} element={<Home/>} />
        } */}
        <Route path='/kyawsan/home' element={<Home />}></Route>
        <Route path='/kyawsan/dailysalereport' element={<DailySaleReportOne/>}></Route>
        <Route path='/kyawsan/fueldatareport' element={<FuelInDailyReport />}></Route>
        <Route path='/kyawsan/dailysalesummaryreport' element={<DailyThisDay />}></Route>
        <Route path='/kyawsan/searchreports' element={<SearchReports />}></Route>   
        <Route path='/kyawsan/tankbalancereport' element={<TankBalanceReport />}></Route>    
        <Route path='/kyawsan/salessummarbystation' element={<DailySummaryByStationReport/>}></Route>    
        <Route path='/kyawsan/statementreport' element={<StatementReport/>}></Route>    
        <Route path='/kyawsan/onlinemonitoringsalereport' element={<OnlineMonitoringSaleReport/>}></Route>
        <Route path='/kyawsan/categoriesreport' element={<DailySaleCategoriesReport1 />}></Route>
        <Route path='/kyawsan/weekly' element={<WeeklySaleReport />}></Route>
        <Route path='/kyawsan/fuelbalance' element={<FuelBalanceReport/>}></Route>
        <Route path='/kyawsan/adjustment' element={<Adjustment />}></Route>
        <Route path='/kyawsan/tankdemo' element={<TankBalance/>}></Route>
        <Route path="/kyawsan/fueltypebalance" element={<FuelTypeBalanceReport />}></Route>    
        <Route path="/kyawsan/real-tank" element={<RealTimeTank />}></Route>    
        <Route path='/usermanual' element={<UserManual />} />
        {/* kyawsan amdin */}
        <Route path='/kyawsan/main-con/dash' element={<MainConDas />} />
        <Route path='/kyawsan/dashboard' element={<Dashboard />} />
        <Route path='/kyawsan/main-con/home' element={<Home/>}/>
        <Route path='/admin/dashboard' element={<DashBoardAd />}></Route>
        <Route path='/admin/station-set-up/choose' element={<StationSetUpChoose />}></Route>
        <Route path='/admin/station-set-up' element={<StationSetUpAd />}></Route>
        <Route path='/admin/accounts' element={<AccountAd />}></Route>
        <Route path='/admin/home' element={<HomePageAd />}></Route>
        <Route path='/admin/station/home' element={<DetAdminHome />}></Route>
        <Route path='/admin/account/details' element={<AccountDetails />} />
        <Route path='/admin/station/banned' element={<StationBanned />} />
        <Route path='/admin/choose-collection' element={<ChooseStationCollections/>} />
        <Route path='/admin/create-collection' element={<AddCollections/>} />
        
        {/* PPRD CHOOSE */}
        <Route path='/user/choose' element={<Pprdchoose/>} />
      </Routes>
      <Footer/>  
    </>  
  )
}

export default Routerdo