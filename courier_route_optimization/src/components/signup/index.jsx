import React from "react";
import { GeneralContainer, LeftContainer,Logo ,LogoDiv,Name,Motto,Img,StaticsNumber,ContinueWithDiv,StaticsText,Staticsp,SignInButton,Statics,MailIcon,Title,ProjectName,Card,Text1,Text2,MailDiv,MailInput,MailLabel,ContinueWithGoogleButton, GoogleIcon, SignUpText, SignUpLink, BottomDiv} from "../signIn/Styled.js";
import LogoImage from "../../images/compass.png";
import { RightContainer,AgreeText,AgreeCheckbox,AgreementSection,InputForm } from "./Styled.js";
import MainImage from "../../images/signupimage.jpg";
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";

const SignUp=()=>{

  
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
          <Motto>Join thousands of logistics companies optimizing their delivery routes with AI-powered solutions.</Motto>
          <Img src={MainImage} />
          <Statics>
            <StaticsNumber><StaticsText>50K+</StaticsText><Staticsp>Routes optimized</Staticsp></StaticsNumber>
            <StaticsNumber><StaticsText>30%</StaticsText><Staticsp>Cost Reduction</Staticsp></StaticsNumber>
          </Statics>
        </LeftContainer>
        <RightContainer>
          <Card>
            <InputForm>
              <Text1>Create your Account</Text1>
              <Text2>Start optimizing your delivery routes today</Text2>

              <MailDiv>
                <MailLabel>Full Name</MailLabel>
                <MailIcon>
                  <IoPersonOutline />
                </MailIcon>
                <MailInput type="text" placeholder="Enter your full name"/>
              </MailDiv>

              <MailDiv>
                <MailLabel>Email Address</MailLabel>
                <MailIcon>
                  <CiMail/>
                </MailIcon>
                <MailInput type="email" placeholder="name@company.com"/>
              </MailDiv>

              <MailDiv>
                <MailLabel>Company Name</MailLabel>
                <MailIcon>
                  <FaRegBuilding />
                </MailIcon>
                <MailInput type="text" placeholder="Your company name"/>
              </MailDiv>
            
              <MailDiv>
                <MailLabel>Password</MailLabel>
                <MailIcon>
                  <TbLockPassword />
                </MailIcon>
                <MailInput type="password" placeholder="Create a strong password"/>
              </MailDiv>

              <MailDiv>
                <MailLabel>Confirm Password</MailLabel>
                <MailIcon>
                  <TbLockPassword />
                </MailIcon>
                <MailInput type="password" placeholder="Confirm your password"/>
              </MailDiv>
              <AgreementSection>
                <AgreeCheckbox type="checkbox" />
                <AgreeText>I agree to the Terms of Service and Privacy Policy</AgreeText>
              </AgreementSection>
            </InputForm>
            <SignInButton type="submit">Create Account</SignInButton>

            <ContinueWithDiv>Or sign up with</ContinueWithDiv>
            <ContinueWithGoogleButton type="button"> 
              <GoogleIcon>
              <FcGoogle size="30px"/>
              </GoogleIcon>
              Sign up with Google
            </ContinueWithGoogleButton>
            <SignUpText>Already have an account? <SignUpLink onClick={()=>{navigate("/")}}>Sign in</SignUpLink></SignUpText>
          </Card>
          <BottomDiv>© 2025 Kuryexx. All rights reserved.</BottomDiv>
        </RightContainer>
      </GeneralContainer>
    );
}
export default SignUp;