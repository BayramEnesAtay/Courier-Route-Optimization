import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #F5F7FA;
  height: 100vh;
  row-gap: 20px;
`;
export const Title=styled.h3`
  color:#111827;
  margin:40px;
`;
export const Header=styled.h2`
  color:#11182E;
  font-weight:bold;
  font-size:24px;
  margin:0px;
`;
export const Detail=styled.p`
  color:#AD8580;
  font-size:16px;
`;
export const CardContainer=styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 80px;
  padding:20px;
  
`;
export const ChartWrapper = styled.div`
  width: 320px;        /* GRAFİĞİ KÜÇÜLTEN ASIL ŞEY */
  height: 320px;
  margin: 0 auto;
  margin-bottom:40px;     
`;
export const ChartWrapper2 = styled.div`
  width: 320px;        /* GRAFİĞİ KÜÇÜLTEN ASIL ŞEY */
  height: auto;
  margin: 0 auto;
  margin-bottom:10px;
  flex-direction:column;
  display:flex;
  justify-content:center;
  align-items:center;    
`;
export const OptimizationText=styled.p`
  color:#967290;
  font-size:14px;
  margin-top:5px;
`;
export const OptimizationNumber=styled.p`
  color:#1B75E0;
  font-size:30px;
  margin-bottom:10px;
`;
export const OptimizationTextDiv=styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  column-gap:40px;
`;
export const OptimizationSubDiv=styled.div`
  display:flex;
  flex-direction:column;
  
`;
export const Card=styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex:1;
`;
export const Card2=styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex:0.5;
`;
export const Card3=styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex:2;
`;
export const CardP=styled.p`
  color:#967280;
  margin:0px;
`;
export const CardIcon=styled.div`
  font-size:30px;
  
`;
export const CardStatics=styled.h3`
  color:#111827;
  margin-top:10px;
  margin-bottom:0px;
`;
export const CardP_Stat=styled.div`
  display:flex;
  flex-direction:column;
  margin:0px;
  margin-bottom:0px;
  
`;
export const ProgressCircle = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: conic-gradient(
    #22c55e 0% 85%,
    #e5e7eb 85% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerCircle = styled.div`
  width: 160px;
  height: 160px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PercentText = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #111827;
`;

export const SubText = styled.div`
  font-size: 14px;
  color: #6b7280;
`;


export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 20px;
  flex:2;
`;

export const RecentTable = styled.div`
  display: flex;
  flex-direction: column;
  padding:40px 40px;
`;

export const RecentHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-weight: bold;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
`;

export const RecentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
`;

export const RouteCell = styled.div`
  flex: 2;
  color: #111827;
`;

export const PointsCell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: #111827;
  column-gap: 4px;
`;

export const StatusCell = styled.div`
  flex: 1.5;
`;

export const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ status }) =>
    status === "Completed" ? "#E6F4EA" : "#E0EFFF"};
  color: ${({ status }) =>
    status === "Completed" ? "#34A853" : "#4285F4"};
`;

export const TimeCell = styled.div`
  flex: 1;
  color: #111827;
`;

export const RecentTitle = styled.h4`
  color: #111827;
  margin: 20px;
  margin-bottom: 10px;
`;
