import { useContext } from "react";
import FilterContext from "../AppContext/filterContext";
import DataContext from "../AppContext/dataContext";
import crossIcon from "../crossIcon.png"
function Overlay(){
    const {selectedFilter,end_year_options,topic_options,sector_options,region_options,pest_options,
    source_options,country_options,setShowOverlay}=useContext(FilterContext);
    const {setCallingFilter}=useContext(DataContext);
    const mappingunction={"end_year":end_year_options,"country":country_options,"source":source_options,"topic":topic_options,"sector":sector_options,"region":region_options,"pestle":pest_options};
    console.log("======================",selectedFilter);
    const data=mappingunction[selectedFilter];
    return(
        <div className=" z-50 absolute right-[100px] w-[80%] min-h-[400px] p-4 rounded-lg backdrop-blur-2xl" >
            <img src={crossIcon} onClick={()=>{setShowOverlay(false)}} className="hover:scale-110 p-3"></img>
             {data&&data.length>0 &&    
             (
                data.map((ele)=>{
                    return(
                        <button onClick={()=>{let str=`{"${selectedFilter}":"${ele}"}`;setCallingFilter(str)}} type="button" class="text-white bg-gray-700 hover:bg-gray-300 hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{ele}</button>
                    )
                })
             )}
        </div>
    )
}
export default Overlay;