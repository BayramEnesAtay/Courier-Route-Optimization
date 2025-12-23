import React, { useState } from "react"; // useState eklendi
import { GeneralContainer, LeftContainer, Logo, LogoDiv, Name, Motto, Img, StaticsNumber, ContinueWithDiv, StaticsText, Staticsp, SignInButton, Statics, MailIcon, Title, ProjectName, Card, Text1, Text2, MailDiv, MailInput, MailLabel, ContinueWithGoogleButton, GoogleIcon, SignUpText, SignUpLink, BottomDiv } from "../signIn/Styled.js";
import LogoImage from "../../images/compass.png";
import { RightContainer, AgreeText, AgreeCheckbox, AgreementSection, InputForm } from "./Styled.js";
import MainImage from "../../images/signupimage.jpg";
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();

  // 1. Form Verilerini Tutmak İçin State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // 2. İnputlar değişince State'i güncelle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Kayıt Ol Fonksiyonu (Port 8000'e Gider)
  const handleRegister = async (e) => {
    e.preventDefault();

    // Şifreler eşleşiyor mu kontrolü
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // DİKKAT: Arkadaşının Backend Portu (8000)
      // Endpoint genelde '/api/auth/register/' olur. Arkadaşının urls.py dosyasında farklıysa burayı düzelt.
      const res = await fetch("http://127.0.0.1:8000/accounts/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Backend'in beklediği format (Genelde username, email, password isterler)
          username: formData.email, // Username yerine email kullandık (yaygın pratik)
          email: formData.email,
          password: formData.password,
          first_name: formData.fullName 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully! Redirecting to login...");
        navigate("/"); // Başarılıysa Giriş sayfasına yönlendir
      } else {
        // Backend'den gelen hatayı göster (Örn: Bu email zaten kayıtlı)
        alert("Registration failed: " + JSON.stringify(data));
      }

    } catch (err) {
      console.error("Hata:", err);
      alert("Connection error to Backend (Port 8000). Is it running?");
    }
  };

  return (
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
          {/* InputForm bir form etiketi değilse bile onClick buttonda olduğu için çalışır */}
          <InputForm> 
            <Text1>Create your Account</Text1>
            <Text2>Start optimizing your delivery routes today</Text2>

            <MailDiv>
              <MailLabel>Full Name</MailLabel>
              <MailIcon>
                <IoPersonOutline />
              </MailIcon>
              <MailInput 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                type="text" 
                placeholder="Enter your full name" 
              />
            </MailDiv>

            <MailDiv>
              <MailLabel>Email Address</MailLabel>
              <MailIcon>
                <CiMail />
              </MailIcon>
              <MailInput 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                type="email" 
                placeholder="name@company.com" 
              />
            </MailDiv>

            <MailDiv>
              <MailLabel>Password</MailLabel>
              <MailIcon>
                <TbLockPassword />
              </MailIcon>
              <MailInput 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                type="password" 
                placeholder="Create a strong password" 
              />
            </MailDiv>

            <MailDiv>
              <MailLabel>Confirm Password</MailLabel>
              <MailIcon>
                <TbLockPassword />
              </MailIcon>
              <MailInput 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                type="password" 
                placeholder="Confirm your password" 
              />
            </MailDiv>
            <AgreementSection>
              <AgreeCheckbox type="checkbox" />
              <AgreeText>I agree to the Terms of Service and Privacy Policy</AgreeText>
            </AgreementSection>
          </InputForm>
          
          {/* Buttona onClick eklendi */}
          <SignInButton onClick={handleRegister} type="submit">Create Account</SignInButton>

          <ContinueWithDiv>Or sign up with</ContinueWithDiv>
          <ContinueWithGoogleButton type="button">
            <GoogleIcon>
              <FcGoogle size="30px" />
            </GoogleIcon>
            Sign up with Google
          </ContinueWithGoogleButton>
          <SignUpText>Already have an account? <SignUpLink onClick={() => { navigate("/") }}>Sign in</SignUpLink></SignUpText>
        </Card>
        <BottomDiv>© 2025 Kuryexx. All rights reserved.</BottomDiv>
      </RightContainer>
    </GeneralContainer>
  );
}
export default SignUp;