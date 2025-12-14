import React from "react";
import { GeneralContainer, LeftContainer, RightContainer,Logo ,LogoDiv,Name,Motto,Img,StaticsNumber,ContinueWithDiv,StaticsText,Staticsp,SignInButton,Statics,MailIcon,Title,ProjectName,Card,Text1,Text2,MailDiv,MailInput,MailLabel,ContinueWithGoogleButton, GoogleIcon, SignUpText, SignUpLink, BottomDiv, InputForm} from "./Styled.js";
import LogoImage from "../../images/compass.png";
import MainImage from "../../images/image2.jpg";
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SignIn=()=>{

  
  const navigate=useNavigate();
    return(
      <GeneralContainer>
        <LeftContainer>
          <Title>
            <LogoDiv>
              <Logo src={LogoImage} />
            </LogoDiv>
            <ProjectName>Kuryexx</ProjectName>
          </Title>
          <Name>Smart Courier Route Optimization Platform</Name>
          <Motto>Optimize delivery routes, reduce costs, and increase efficiency with  logistics solutions.</Motto>
          <Img src={MainImage} />
          <Statics>
            <StaticsNumber><StaticsText>50K+</StaticsText><Staticsp>Routes optimized</Staticsp></StaticsNumber>
            <StaticsNumber><StaticsText>30%</StaticsText><Staticsp>Cost Reduction</Staticsp></StaticsNumber>
          </Statics>
        </LeftContainer>
        <RightContainer>
          <Card>
            <InputForm>
              <Text1>Welcome Back!</Text1>
              <Text2>Sign to your Kuryexx account</Text2>
              <MailDiv>
                <MailLabel>Email Address</MailLabel>
                <MailIcon>
                  <CiMail/>
                </MailIcon>
                <MailInput type="email" placeholder="name@company.com"/>
              </MailDiv>
              <MailDiv>
                <MailLabel>Password</MailLabel>
                <MailIcon>
                  <TbLockPassword />
                </MailIcon>
                <MailInput type="password" placeholder="Enter your Password"/>
              </MailDiv>
            </InputForm>

            <SignInButton type="submit">Sign In</SignInButton>

            <ContinueWithDiv>Or continue with</ContinueWithDiv>
            <ContinueWithGoogleButton type="button"> 
              <GoogleIcon>
              <FcGoogle size="30px"/>
              </GoogleIcon>
              Sign in with Google
            </ContinueWithGoogleButton>
            <SignUpText>Don't have an account? <SignUpLink onClick={()=>{navigate("/sign-up")}}>Sign up</SignUpLink></SignUpText>
          </Card>
          <BottomDiv>© 2025 Kuryexx. All rights reserved.</BottomDiv>
        </RightContainer>
      </GeneralContainer>
    );
}
export default SignIn;