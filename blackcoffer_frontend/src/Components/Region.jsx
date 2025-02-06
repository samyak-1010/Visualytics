import React, {useState ,useContext, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import DataContext from '../AppContext/dataContext';
import Skeleton from './Skeleton';
function Region(){
    const {region}=useContext(DataContext);
    const [chartData,setChartData]=useState();
    useEffect(()=>{
      if(region==undefined||region==null)
        return;
      console.log(region);
      ChartJS.register(ArcElement, Tooltip, Legend);
      const keys =Object.keys(region);
      const values =Object.values(region);
      const resp_data={
      labels: keys,
      datasets:[
        {
        label:'Region',
        data:values,
        backgroundColor: [
          'rgb(237,241,244)',
          'rgb(255,207,92)',
          'rgb(210,45,46)',
          'rgb(226,210,254)',
          'rgb(38,214,235)',
          'rgb(170,0,34)',
          'rgb(74,153,118)',
          'rgb(170,75,137)',
          'rgb(23,9,63)',
          'rgb(120,36,76)',
          'rgb(204,143,133)',
          'rgb(229,43,80)',
          'rgb(0,20,168)',
          'rgb(76,0,123)',
          'rgb(178,255,102)',
          'rgb(131,106,249)',
          'rgb(255,232,2)',
          'rgb(255,129,49)',
          'rgb(210,45,46)',
          'rgb(41,154,255)',
          'rgb(79,93,112)',
          'rgb(40,218,198)',
          'rgb(246,159,169)',
          'rgb(40,199,111)',
          'rgb(132,208,255)',
      
        ],
        borderWidth:0,
        }
        ]
      }
      setChartData(resp_data);
    },[region]);
    const options={
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle'
            }
          }
        }
    };
    return (
      <div className='p-4 w-[550px] h-[630px] flex flex-col items-center graphcontainer rounded-lg'>
         <Skeleton></Skeleton>
        <div className='text-[30px] font-bold '>Region</div>
        {chartData && <Pie data={chartData}  options={options}/>}
      </div>
    );
};
export default Region;