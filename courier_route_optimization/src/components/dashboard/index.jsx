import React from "react";
import { DashboardContainer,CardContainer,Card,Detail,Header,CardP,CardStatics,CardIcon,CardP_Stat,Title,ChartWrapper,ProgressCircle,PercentText,InnerCircle,SubText,Card2,Card3,ChartWrapper2,OptimizationTextDiv,OptimizationSubDiv,OptimizationNumber,OptimizationText,BottomContainer, RecentTable,RecentHeaderRow,RecentRow,RouteCell,PointsCell,StatusCell,StatusBadge,TimeCell,EfficiencyCell,RecentTitle} from "./Styled";
import { LuPackage } from "react-icons/lu";
import { FaRoute } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";
import { FaRegClock,FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
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

    const generateRandomRoutes = () => {
    const statuses = ["Completed", "In Progress"];
    const names = ["Route A-12", "Route B-08", "Route C-15", "Route D-03"];
    return names.map((name) => {
      const points = Math.floor(Math.random() * 15) + 5;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const hours = Math.floor(Math.random() * 2) + 1;
      const minutes = Math.floor(Math.random() * 60);
      const efficiency = Math.floor(Math.random() * 21) + 80;
      return {
        route: name,
        points,
        status,
        time: `${hours}h ${minutes}m`,
        efficiency: `${efficiency}%`,
      };
    });
  };
const [recentRoutes] = useState(generateRandomRoutes);

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

    <CardContainer>
      
      <Card2>
        <Title>Route Optimization Rate</Title>
        <ChartWrapper2>
        <ProgressCircle>
          <InnerCircle>
            <PercentText>85 %</PercentText>
            <SubText>Optimized</SubText>
          </InnerCircle>
        </ProgressCircle>
        <OptimizationTextDiv>
          <OptimizationSubDiv>
            <OptimizationNumber>327</OptimizationNumber>
            <OptimizationText>Optimized</OptimizationText>
          </OptimizationSubDiv>
          <OptimizationSubDiv>
            <OptimizationNumber>58</OptimizationNumber>
            <OptimizationText>Standart</OptimizationText>
          </OptimizationSubDiv>
        </OptimizationTextDiv>
        </ChartWrapper2>
      </Card2>
      
      <BottomContainer>
        <Card3>
          <RecentTitle>Recent Routes</RecentTitle>
          <RecentTable>
            <RecentHeaderRow>
              <RouteCell>Route</RouteCell>
              <PointsCell>Points</PointsCell>
              <StatusCell>Status</StatusCell>
              <TimeCell>Time</TimeCell>
              <EfficiencyCell>Efficiency</EfficiencyCell>
            </RecentHeaderRow>
            {recentRoutes.map((item, index) => (
              <RecentRow key={index}>
                <RouteCell>{item.route}</RouteCell>
                <PointsCell>
                  <FaMapMarkerAlt color="#7E72A1" /> {item.points}
                </PointsCell>
                <StatusCell>
                  <StatusBadge status={item.status}>{item.status}</StatusBadge>
                </StatusCell>
                <TimeCell>{item.time}</TimeCell>
                <EfficiencyCell status={item.status}>{item.efficiency}</EfficiencyCell>
              </RecentRow>
            ))}
          </RecentTable>
        </Card3>
      </BottomContainer>


    </CardContainer>
  </DashboardContainer>  
  );
};
export default Dashboard;