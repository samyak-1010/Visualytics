import axios from 'axios';
import { useEffect ,useState} from "react";
import Skeleton from './Skeleton';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );  
function BarChart(){
    const [chartData,setChartData]=useState();
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Country Data',
          },
        },
      };
    async function get_detail_by_country(){
        try{
          const response=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-by-country`);
          // console.log(response?.data?.message);
          PrepareChart(response?.data?.message);
        }
        catch(err){
          console.log(err);
        }
      }
    useEffect(()=>{
      get_detail_by_country();
    },[]);
    function PrepareChart(data_bk){
        
        const separatedValues = data_bk.reduce((acc, item) => {
            acc.country.push(item._id            );
            acc.intensity.push(item.averageIntensity            );
            acc.livelihood.push(item.averagelikelihood            );
            acc.relevance.push(item.averageRelevance);
            return acc;
          }, { country: [], intensity: [], livelihood: [] ,relevance:[]});

        //   console.log(separatedValues.intensity);
       
        const data = {
            labels:separatedValues.country,
            datasets: [
              {
                label: 'Average Intensity',
                data: separatedValues.intensity,
                backgroundColor: 'rgba(185, 76, 225)',
              },
              {
                label: 'Average Livelihood',
                data: separatedValues.livelihood,
                backgroundColor: 'rgba(238,50,51)',
              },
              {
                label: 'Average Relevance',
                data: separatedValues.relevance,
                backgroundColor: 'rgba(77,137,99)',
              },
            ],
          };
          setChartData(data);
    }
    return(
        <div className='w-full graphcontainer'>
           <Skeleton></Skeleton>
      {chartData && (<Bar options={options} data={chartData} />)}
      </div>
    )
}
export default BarChart;