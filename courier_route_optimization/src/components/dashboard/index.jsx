import React from "react";
import { DashboardContainer,CardContainer,Card,Detail,Header,CardP,CardStatics,CardIcon,CardP_Stat,Title,ChartWrapper } from "./Styled";
import { LuPackage } from "react-icons/lu";
import { FaRoute } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as TooltipJS,
  Legend
} from "chart.js";


ChartJS.register(ArcElement, TooltipJS, Legend);

const Dashboard=()=>{
  const weeklyData=[
    { day: "Mon", planned: 45, completed: 38 },
    { day: "Tue", planned: 50, completed: 47 },
    { day: "Wed", planned: 47, completed: 44 },
    { day: "Thu", planned: 60, completed: 56 },
    { day: "Fri", planned: 54, completed: 50 },
  ];

  const statusData = {
  labels: ["Delivered", "In Transit", "Delayed", "Failed"],
  datasets: [
    {
      data: [65, 15, 12, 8],
      backgroundColor: [
        "#34a853", // green
        "#4285f4", // blue
        "#fbbc05", // yellow
        "#ea4335", // red
      ],
      borderWidth: 0,
    },
  ],
};
  return(
    <DashboardContainer >
      <Header>Dashboard Overview</Header>
      <Detail>Monitor your delivery performance and route optimization metrics</Detail>
      <CardContainer>
        <Card><CardContainer><CardP_Stat><CardP>Total Deliveries</CardP><CardStatics>232</CardStatics></CardP_Stat><CardIcon><LuPackage color="#1A73E8"/></CardIcon></CardContainer></Card>
        <Card><CardContainer><CardP_Stat><CardP>Active Routes</CardP><CardStatics>18</CardStatics></CardP_Stat><CardIcon><FaRoute color="#34A953"/></CardIcon></CardContainer></Card>
        <Card><CardContainer><CardP_Stat><CardP>Route Efficiency</CardP><CardStatics>89%</CardStatics></CardP_Stat><CardIcon><AiOutlineRise color="#FBBC04"/></CardIcon></CardContainer></Card>
        <Card><CardContainer><CardP_Stat><CardP>Avg. Delivery Time</CardP><CardStatics>1.8h</CardStatics></CardP_Stat><CardIcon><FaRegClock  color="#EA4335"/></CardIcon></CardContainer></Card>
      </CardContainer>
      <CardContainer>
      <Card>
      <Title>Weekly Delivery Performance</Title>
      <ResponsiveContainer width="100%" height={300}>
        <ChartWrapper>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="planned" fill="#3f8efc" radius={[6,6,0,0]} />
            <Bar dataKey="completed" fill="#34a853" radius={[6,6,0,0]} />
          </BarChart>
      </ChartWrapper>
    </ResponsiveContainer>
    </Card>
    <Card>
      <Title>Delivery Status Distribution</Title>
      <ChartWrapper>
      <Doughnut data={statusData} options={{ cutout: "70%" }}/>
      </ChartWrapper>
    </Card>
    </CardContainer>
  </DashboardContainer>  
  );
};
export default Dashboard;