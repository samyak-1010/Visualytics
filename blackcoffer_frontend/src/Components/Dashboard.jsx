import Intensity from "./Intensity";
import Likelihood from "./Likelihood";
import Relevance from "./Relevance";
import Country from "./Country";
import Region from "./Region";
import Topics from "./Topics";
import Year from "./Year";
import BarChart from "./BarChart";
const Dashboard = () => {
  return(
    <div className=" w-full flex flex-wrap   justify-evenly p-4 gap-10 dashboard">
  <Intensity></Intensity>
  <Likelihood></Likelihood>
  <Relevance></Relevance>
  <Country></Country>
  <Region></Region>
  <Topics/>
  <Year/>
  <BarChart/>
  </div>
  )
};

export default Dashboard;
