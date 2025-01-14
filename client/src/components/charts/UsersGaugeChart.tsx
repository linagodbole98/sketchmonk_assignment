import ReactECharts from 'echarts-for-react';
import { useUserStats } from '../../api/queries';
import { NoData } from '../NoData';
import { GaugeChartSkeleton } from '../skeletons/ChartSkeletons';
import { FaUsers } from 'react-icons/fa';
import { IoPeopleOutline } from 'react-icons/io5';

export const UsersGaugeChart = () => {
  const { data: userData, isLoading, error } = useUserStats();

  if (isLoading) return <GaugeChartSkeleton />;
  if (error || !userData) return <NoData message="Error loading user stats" />;

  const premiumPercentage = (userData.premium / userData.total) * 100;

  // const option = {
  //   series: [
  //     {
  //       type: 'gauge',
  //       startAngle: 180,
  //       endAngle: 0,
  //       min: 0,
  //       max: 100,
  //       radius: '100%',
  //       progress: {
  //         show: true,
  //         roundCap: true,
  //         width: 16,
  //         itemStyle: {
  //           color: '#287F71',
  //         },
  //       },
  //       pointer: {
  //         show: false,
  //       },
  //       axisLine: {
  //         roundCap: true,
  //         lineStyle: {
  //           width: 16,
  //           color: [
  //             [premiumPercentage / 100, '#287F71'],
  //             [1, '#eaeaea'],
  //           ],
  //         },
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       splitLine: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         show: false,
  //       },
  //       title: {
  //         show: false,
  //       },
  //       detail: {
  //         show: false,
  //       },
  //       data: [
  //         {
  //           value: premiumPercentage,
  //         },
  //       ],
  //     },
  //   ],
  // };

  // const option = {
  //   series: [
  //     {
  //       // Main Gauge Chart
  //       type: 'gauge',
  //       startAngle: 200,
  //       endAngle: 0,
  //       min: 0,
  //       max: 120,
  //       radius: '90%', // Inner gauge radius
  //       progress: {
  //         show: true,
  //         roundCap: true,
  //         width: 16,
  //         itemStyle: {
  //           color: '#287F71', // Active progress color
  //         },
  //       },
  //       pointer: {
  //         show: false, // No pointer needed
  //       },
  //       axisLine: {
  //         roundCap: true,
  //         lineStyle: {
  //           width: 16,
  //           color: [
  //             [0.5, '#287F71'], // Filled part
  //             [1, '#eaeaea'],   // Remaining part
  //           ],
  //         },
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       splitLine: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         show: false,
  //       },
  //       title: {
  //         show: false,
  //       },
  //       detail: {
  //         show: false,
  //       },
  //       data: [
  //         {
  //           value: 50, // Example percentage
  //         },
  //       ],
  //     },
  //     {
  //       // Outer Circular Line
  //       type: 'gauge',
  //       startAngle: 200,
  //       endAngle: 0,
  //       min: 0,
  //       max: 120,
  //       radius: '100%', // Outer circle radius
  //       axisLine: {
  //         lineStyle: {
  //           width: 4, // Width of the outer circle
  //           color: [
  //             [1, '#d1d5db'], // Light gray for the full circle
  //           ],
  //         },
  //       },
  //       pointer: {
  //         show: false,
  //       },
  //       progress: {
  //         show: false,
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       splitLine: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         show: false,
  //       },
  //       detail: {
  //         show: false,
  //       },
  //     },
  //   ],
  // };


  const option = {
    series: [
      {
        // Main Gauge Chart
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        radius: '90%', // Inner gauge radius
        progress: {
          show: true,
          roundCap: true,
          width: 16,
          itemStyle: {
            color: '#287F71', // Active progress color
          },
        },
        pointer: {
          show: false, // No pointer needed
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 16,
            color: [
              [0.5, '#287F71'], // Filled part
              [1, '#eaeaea'],   // Remaining part
            ],
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: [
          {
            value: 50, // Example percentage
          },
        ],
      },
      {
        // Outer Circular Line
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        radius: '100%', // Outer circle radius
        axisLine: {
          lineStyle: {
            width: 6, // Width of the outer circle (increase for visibility)
            color: [
              [1, '#d1d5db'], // Light gray for the full circle
            ],
          },
        },
        pointer: {
          show: false,
        },
        progress: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
        },
      },
    ],
  };
  
  
  return (
    <div className="h-[300px] relative  justify-center align-middle items-center">
      <ReactECharts
        option={option}
        style={{ height: '70%', width:"100%" }}
        opts={{ renderer: 'svg' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-gray-800">
         <div className='flex justify-center align-center'> <IoPeopleOutline className="mr-2 text-emerald-600 border-2 border-gray-400 p-1 rounded-full bg-slate-100" /></div>
          
          {userData.total.toLocaleString()}
        </div>
     
        <div className="text-sm text-gray-500 mt-1">Total Users</div>
        <div className="flex gap-8 mt-4">
          <div className="text-center border-l-2 border-green-600 px-3 rounded-sm justify-start">
            <div className="text-lg font-semibold text-emerald-600 flex justify-start">
              {userData.premium.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Premium Plan</div>
          </div>
          <div className="h-16 border-l-2 border-gray-400"></div>
          <div className="text-center border-r-2 border-gray-400 px-3 rounded-sm ">
            <div className="text-lg font-semibold text-gray-400 flex justify-end">
              {userData.basic.toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Basic Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};
