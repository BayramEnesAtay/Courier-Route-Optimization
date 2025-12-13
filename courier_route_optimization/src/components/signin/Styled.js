import React from "react";
import styled from "styled-components";
import BackgroundImage from "../../images/backimage.jpg";

export const GeneralContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height:100vh;
`

export const LeftContainer = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  height:100%;
  padding-left:5%;
  padding-top:7%;
  padding-bottom:7%;
  padding-right:5%;
  background-image:url(${BackgroundImage});
  row-gap:15px;
  min-height:100vh;
  background-size: cover;
  background-position: center;
  

`
export const RightContainer = styled.div`
  flex:1;
  justify-content: center;
  flex-direction: column;
  display: flex;
  height:100%;
  min-height:100vh;
  padding-left:5%;
  padding-top:200px;
  padding-bottom:7%;
  padding-right:5%;
  background-color:#F5F7FA;
`
export const Logo=styled.img`
  width:50px;
  height:auto;
  
`;
export const LogoDiv=styled.div`
  padding:5px;
  background:#14979D;
  border-radius:10px;
  display:inline-flex;
  width:fit-content;
`
export const Name=styled.h1`
  color:#ffff;
  font-family: 'Arial', sans-serif;
  margin-bottom:10px;
  font-size:32px;
`;

export const Motto=styled.p`
  color:#ffff;
  font-family: 'Arial', sans-serif;
  line-height:1.5;
  margin-bottom:40px;
  font-size:18px;
`;
export const Title=styled.div`
  display:flex;
  flex-direction:row;
  column-gap:10px;

`;
export const ProjectName=styled.h2`
  color:#6C7FF8;
  font-family: 'Arial', sans-serif;
`;

export const Img=styled.img`
  margin-left:15px;
  margin-right:15px;
  border-radius:10px;
  width:90%;
  height:auto;
`;

export const Statics=styled.div`
  display:flex;
  flex-direction:row;
  column-gap:20px;
`;
export const StaticsNumber=styled.div`
  display:flex;
  flex-direction:column;
  margin:15px;
`;

export const StaticsText=styled.h3`
  color:#ffff;
  margin-bottom:0px;
  font-family: 'Arial', sans-serif;
  font-size:24px;
`;
export const Staticsp=styled.p`
  color:#8693A0;
  margin-top:5px;
  font-family: 'Arial', sans-serif;
  font-size:16px;
`;

export const Card=styled.div`
  background:#ffff;
  border-radius:13px;
  display:flex;
  width:80%;
  height:fit-content;
  padding:32px;
  display:flex;
  flex-direction:column;
  align-items:stretch;
  box-shadow:10px 10px 10px rgba(0, 0, 0, 0.1);
`;

export const Text1=styled.h2`
  color:#111827;
  font-size:28px;

`;

export const Text2=styled.p`
  color:#837480;
  font-size:16px;

`;

export const InputForm=styled.form`

`;

export const MailDiv=styled.div`
  display:flex;
  margin-top:20px;
  flex-direction:column;
  row-gap:8px;
  position:relative;
`;
export const MailIcon=styled.div`
  position:absolute;
  left:10px;
  top:55%;
  
  
`;
export const MailLabel=styled.label`
  color:#7E4151;
`;

export const MailInput=styled.input`
  padding:15px;
  padding-left:30px;
  border-radius:10px;
  border:1px solid #D1D5DB;
`;

export const SignInButton=styled.button`
  background:#1A73E8;
  color:#ffff;
  border:none;
  border-radius:20px;
  justify-content:center;
  align-items:center;
  margin-top:50px;
  padding-top:5%;
  padding-bottom:5%;
  padding-left:10%;
  padding-right:10%;
  font-size:18px;
  transition: background 0.3s ease;
  &:hover{
    background:#1669C1;
    cursor:pointer;}
`;
export const ContinueWithGoogleButton=styled.button`
  background:#FFFFFF;
  color:#111827;
  display:flex;
  gap:10px;
  border:1px solid #D1D5DB;
  border-radius:20px;
  justify-content:center;
  align-items:center;
  margin-top:50px;
  padding-top:5%;
  padding-bottom:5%;
  padding-left:10%;
  padding-right:10%;
  font-size:18px;
  transition: background 0.3s ease;
  &:hover{
    background:#F9FAFB;
    cursor:pointer;
    }
  position:relative;  
`;

export const ContinueWithDiv=styled.div`
  display:flex;
  flex-direction:row;
  margin-top:40px;
  justify-content:center;
  align-items:center;
  font-size:14px;
  color:#6B7280;
`;
export const GoogleIcon=styled.div`
 position:absoulute;
`;
export const SignUpText=styled.p`
  color:#B28680;
  text-align:center;
  margin-top:40px;
  width:100%;
`;
export const SignUpLink=styled.a`

`;
export const BottomDiv=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  color:#B28680;
  margin-top:40px;
  font-size:14px;
  width:100%;
`;
