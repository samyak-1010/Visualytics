import React, { useEffect, useState,createContext ,useContext} from 'react';
import axios from 'axios';
import FilterContext from './filterContext';
const DataContext=createContext();
export const DataContextProvider=({children})=>{
    const [callingFilter,setCallingFilter]=useState();
    const {setSelectedFilter,setShowOverlay}=useContext(FilterContext);
    // console.log("sagar");
    const [data, setData] = useState();
    console.log(data);
    const [intensity,setIntensity]=useState();
    const [likelihood,setLikelihood]=useState();
    const [relevance,setRelevance]=useState();
    const [country,setCountry]=useState();
    const [city,setCity]=useState();
    const [region,setRegion]=useState();
    const [topics,setTopics]=useState();
    const [start_year,setStartYear]=useState();
    const [sector,setSector]=useState();
    const [showSkeleton,setShowSkeleton]=useState(false)
    useEffect(()=>{
        // console.log("get data called");
        get_data({});
    },[]);
    useEffect(()=>{ prepareChartData(data);},[data]);
    async function get_data(callingFilter){
        // console.log("api called")
        setShowSkeleton(true);
        try{
            // console.log(callingFilter);
        const response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/get-data`,{callingFilter});
        setData(response?.data?.message);
        setShowOverlay(false);
        setShowSkeleton(false);
        }
        catch(err){
        // console.log(err);
        }
    }
    function prepareChartData(data){
        // console.log("prepare char called");
        if(data&&data.length==0)
            return;
        const intensity_frequency={};
        const likelihood_frequency={};
        const relevance_frequency={};
        const country_frequency={};
        const city_frequency={};
        const region_frequency={};
        const topics_frequency={};
        const start_year_frequency={};
        const sector_frequency={};
        const source_frequency={}
        const end_year_frequency={};
        const pest_frequency={};
        {data && data.map(d=>{
          let intensity=d.intensity;
          let likelihood=d.likelihood;
          let relevance=d.relevance;
          let country=d.country;
          let city=d.city;
          let region=d.region;
          let topics=d.topic;
          let start_year=d.start_year;
          let sector=d.sector;
          let end_year=d.end_year;
          let pest=d.pestle;
          let source=d.source;
          if(intensity!=""&&intensity_frequency[intensity])
              intensity_frequency[intensity]++;
          else if(intensity!="")
              intensity_frequency[intensity]=1;
          if(likelihood!=""&&likelihood_frequency[likelihood])
              likelihood_frequency[likelihood]++;
          else if(likelihood!="")
            likelihood_frequency[likelihood]=1;
          if(relevance!=""&&relevance_frequency[relevance])
              relevance_frequency[relevance]++;
          else if(relevance!="")
            relevance_frequency[relevance]=1;
        if(country!=""&&country_frequency[country])
            country_frequency[country]++;
        else if(country!="")
            country_frequency[country]=1;
        if(city!=""&&city_frequency[city])
            city_frequency[city]++;
        else if(city!="")
            city_frequency[city]=1;
        if(region!=""&&region_frequency[region])
            region_frequency[region]++;
        else if(region!="")
            region_frequency[region]=1;
        if(topics!=""&&topics_frequency[topics])
            topics_frequency[topics]++;
        else if(topics!="")
            topics_frequency[topics]=1;
        if(start_year!=""&&start_year_frequency[start_year])
            start_year_frequency[start_year]++;
        else if(start_year!="")
            start_year_frequency[start_year]=1;
        if(sector!=""&&sector_frequency[sector])
            sector_frequency[sector]++;
        else if(sector!="")
            sector_frequency[sector]=1;
        if(end_year!=""&&end_year_frequency[end_year])
            end_year_frequency[end_year]++;
        else if(end_year!="")
            end_year_frequency[end_year]=1;
        if(pest!=""&&pest_frequency[pest])
            pest_frequency[pest]++;
        else if(pest!="")
            pest_frequency[pest]=1;
        if(source!=""&&source_frequency[source])
            source_frequency[source]++;
        else if(source!="")
            source_frequency[source]=1;
        });
      }
        setIntensity(intensity_frequency);
        setLikelihood(likelihood_frequency);
        setRelevance(relevance_frequency);
        setCountry(country_frequency);
        setCity(city_frequency);
        setRegion(region_frequency);
        setTopics(topics_frequency);
        setStartYear(start_year_frequency);
    }
    // console.log(intensity,likelihood,relevance,country,city,sector,topics,start_year,region);
    useEffect(()=>{get_data(callingFilter)},[callingFilter]);
    return (
        <DataContext.Provider value={{intensity,likelihood,relevance,country,region,topics,start_year,callingFilter,setCallingFilter,showSkeleton}}>
            {children}
        </DataContext.Provider>
      );
}
export default DataContext;