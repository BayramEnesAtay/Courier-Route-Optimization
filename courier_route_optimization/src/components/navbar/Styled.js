import styled from "styled-components";

export const NavbarContainer = styled.div`
  width: calc(100% - 250px);
  height: 80px;
  background-color:#FFFFFF;
  display:flex;
  justify-content:space-between;
  flex-direction:row;
  margin-top:0px;
  margin-right:0px;
  margin-left:auto;
  align-items:center;
  outline:1px solid #E5E7EB;
`;
export const CalculateBtn=styled.button`
  background-color:#1557B0;
  color:#FFFFFF;
  border:none;
  border-radius:8px;
  padding:5px 10px;
  height:50%;
  margin-left:40px;
  font-size:16px;
  font-weight:500;
  &:hover{
    cursor:pointer;
    background-color:#0F447F;
  }
    transition: background-color 0.3s ease;
`;

export const Profile=styled.button`
  display:flex;
  flex-direction:row;
  align-items:center;
  border:none;
  border-radius:16px;
  padding:10px 20px;
  background-color:#ffff;
  margin-right:40px;
  &:hover{
    cursor:pointer;
    background-color:#F3F4F6;
  }
    transition: background-color 0.3s ease;

`;
export const ProfileIcon=styled.div`
  width:32px;
  border-radius:16px;
`;
export const ProfileName=styled.span`
  color:#111827;
  margin-left:8px;
`;
