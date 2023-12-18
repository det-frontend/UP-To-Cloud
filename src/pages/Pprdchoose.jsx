import React, { useEffect, useState } from 'react'
import KyawSan from '../assets/images/Unknown-removebg-preview (1).png';
import { PprdchooseCard } from '../components/Cards/PprdchooseCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { englishUserChoose } from '../Language/English/englishUserChoose';
import { myanmarUserChoose } from '../Language/Myanmar/myanmarUserChoose';


export const Pprdchoose = () => {
const [language, setLanguage] = useState(englishUserChoose);
const navigate = useNavigate();
const dispatch = useDispatch();
const user = useSelector((state) => state.login);

useEffect(() => {
    if (!user.login) {
      navigate("/");
    }
    if (user.language === "Myanmar" || user.language === "မြန်မာ") {
      setLanguage(myanmarUserChoose);
    } else if (user.language === "English" || user.language === "အင်္ဂလိပ်") {
      setLanguage(englishUserChoose);
    }
  }, [ user,navigate,dispatch]);

  return (
    <div className='container mx-auto mt-[100px]  min-h-[86svh]  pb-[100px]'>
    <h3 className='text-2xl font-extrabold mt-[110px] mb-[30px] '>{language.main_title}</h3>
    <div className='flex items-start justify-start  flex-wrap w-full gap-5'>
    <PprdchooseCard img={KyawSan} route={"/kyawsan/home"} title={"Kyaw San"}/>
    </div>   
          
    </div>
  )
}
