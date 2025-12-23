import React, { useState } from "react"; // useState eklendi
import { GeneralContainer, LeftContainer, RightContainer, Logo, LogoDiv, Name, Motto, Img, StaticsNumber, ContinueWithDiv, StaticsText, Staticsp, SignInButton, Statics, MailIcon, Title, ProjectName, Card, Text1, Text2, MailDiv, MailInput, MailLabel, ContinueWithGoogleButton, GoogleIcon, SignUpText, SignUpLink, BottomDiv, InputForm } from "./Styled.js";
import LogoImage from "../../images/compass.png";
import MainImage from "../../images/image2.jpg";
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  // 1. Verileri tutmak için State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Giriş Yap Fonksiyonu (Port 8000'e gider)
  const handleLogin = async (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    try {
      // DİKKAT: URL'yi arkadaşının urls.py dosyasında ayarladığımız yere göre yazdım.
      const res = await fetch("http://127.0.0.1:8000/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // SimpleJWT kütüphanesi varsayılan olarak 'username' ve 'password' bekler.
          // Biz kayıt olurken username yerine email kullandığımız için buraya emaili yazıyoruz.
          username: email, 
          password: password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // 3. Başarılıysa Token'ı Kaydet (Senin Rota Sayfan bunu okuyacak)
        localStorage.setItem("access_token", data.access);
        
        // 4. Uygulamaya Yönlendir
        // (Rota sayfanın yolu "/app" ise burası kalsın, "/route-optimization" ise değiştir)
        navigate("/app/dashboard"); 
      } else {
        alert("Giriş Başarısız: Kullanıcı adı veya şifre hatalı.");
      }
    } catch (err) {
      console.error("Login Hatası:", err);
      alert("Sunucuya bağlanılamadı (Port 8000 açık mı?).");
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
        <Motto>Optimize delivery routes, reduce costs, and increase efficiency with logistics solutions.</Motto>
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
                <CiMail />
              </MailIcon>
              {/* Email Inputuna State Bağlandı */}
              <MailInput 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MailDiv>

            <MailDiv>
              <MailLabel>Password</MailLabel>
              <MailIcon>
                <TbLockPassword />
              </MailIcon>
              {/* Password Inputuna State Bağlandı */}
              <MailInput 
                type="password" 
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MailDiv>
          </InputForm>

          {/* Buttona onClick bağlandı */}
          <SignInButton type="submit" onClick={handleLogin}>Sign In</SignInButton>

          <ContinueWithDiv>Or continue with</ContinueWithDiv>
          <ContinueWithGoogleButton type="button">
            <GoogleIcon>
              <FcGoogle size="30px" />
            </GoogleIcon>
            Sign in with Google
          </ContinueWithGoogleButton>
          <SignUpText>Don't have an account? <SignUpLink onClick={() => { navigate("/sign-up") }}>Sign up</SignUpLink></SignUpText>
        </Card>
        <BottomDiv>© 2025 Kuryexx. All rights reserved.</BottomDiv>
      </RightContainer>
    </GeneralContainer>
  );
}
export default SignIn;