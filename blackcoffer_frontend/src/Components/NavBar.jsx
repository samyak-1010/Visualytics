import { useState,useContext  } from 'react';
import companyLogo from '../company_logo.png';
import Overlay from './Overlay';
import FilterContext from "../AppContext/filterContext";
import DataContext from '../AppContext/dataContext';
const Navbar = () => {
    const {setSelectedFilter,showOverlay,setShowOverlay,selectedFilter}=useContext(FilterContext);
    const {callingFilter}=useContext(DataContext);
    const obj=callingFilter && JSON.parse(callingFilter);
  return (
    <nav className='relative  p-4 shadow-md'>
        {showOverlay && (<Overlay></Overlay>)}
      {/* Flex Container */}
      <div className='w-full flex items-center justify-between'>
        {/* Logo */}
        <div className='flex'>
          <img src={companyLogo} alt='' className='w-[150px]'/>
        </div>
        <div className='flex  flex-col items-center'>
          <span className='text-[18px] font-bold'>Filter</span><span className='font-semibold'>{callingFilter ?`${Object.keys(obj)[0]}  :  ${Object.values(obj)[0]}` :"None"}</span>
        </div>
            <select  className="graphcontainer p-2 rounded-3xl" name="filter" id="filter" onChange={(event)=>{setSelectedFilter(event.target.value);setShowOverlay(true)}}>
                <option value="filter">Filter</option>
                <option value="end_year">End Year</option>
                <option value="topic">Topic</option>
                <option value="sector">Sector</option>
                <option value="region">Region</option>
                <option value="pestle">Pest</option>
                <option value="source">Source</option>
                <option value="country">Country</option>
            </select>
      </div>
    </nav>
  );
};

export default Navbar;
