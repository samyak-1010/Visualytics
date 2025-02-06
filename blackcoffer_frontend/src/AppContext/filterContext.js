import {useState,useEffect,createContext} from 'react'
import axios from 'axios';
const FilterContext=createContext();
export const FilterContextProvider=({children})=>{
    const [end_year_options,setEndYearOptions]=useState();
    const [topic_options,setTopicOptions]=useState();
    const [sector_options,setSectorOptions]=useState();
    const [region_options,setRegionOptions]=useState();
    const [pest_options,setPestOptions]=useState();
    const [source_options,setSourceOptions]=useState();
    const [country_options,setCountryOptions]=useState();
    const [city_options,setCityOptions]=useState();
    const [selectedFilter,setSelectedFilter]=useState();
    const [showOverlay,setShowOverlay]=useState(false);
    // ---to implement values of filter
    const [data, setData] = useState();
    console.log(data);
    useEffect(()=>{
        get_data();
    },[]);
    useEffect(()=>{ prepareChartData(data);},[data]);
    async function get_data(){
        // console.log("I am in filter section");
        try{
        // console.log("-------------------------------------------",process.env.REACT_APP_BACKEND_URL);
        const response=await axios.post(`${process.env.REACT_APP_BACKEND_URL}/get-data`);
        setData(response?.data?.message);
        setShowOverlay(false);
        }
        catch(err){
        // console.log(err);
        }
    }
        function prepareChartData(data){
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
        setSourceOptions(Object.keys(source_frequency));
        setSectorOptions(Object.keys(sector_frequency));
        setEndYearOptions(Object.keys(end_year_frequency));
        setPestOptions(Object.keys(pest_frequency));
        setTopicOptions(Object.keys(topics_frequency));
        setRegionOptions(Object.keys(region_frequency));
        setCountryOptions(Object.keys(country_frequency));
    }
    }
    return(
        <FilterContext.Provider value={{end_year_options,topic_options,sector_options,region_options,pest_options,source_options,country_options,
            city_options,selectedFilter,showOverlay,setShowOverlay,setSelectedFilter
        }}>
            {children}
        </FilterContext.Provider>
    )
}
export default FilterContext;