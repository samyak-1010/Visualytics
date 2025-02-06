import { useContext } from "react";
import DataContext from "../AppContext/dataContext";
function Skeleton(){
    const {showSkeleton}=useContext(DataContext);
    return(
        <div className={`absolute top-0 bottom-0 right-0 left-0 bg-[#d7d7d7] ${showSkeleton?"block":"hidden"}`}>
          <div className=' relative skeleton-box'></div>
        </div>
    )
}
export default Skeleton