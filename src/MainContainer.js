import React from "react";
import styled from "styled-components";

import LoginInput from "./LoginInput";
import CTARegister from "./CTARegister";
export default function MainContainer() {
  return (
    <Container>
      <LoginWrapper>
        <Logo src="/logo.jpg" alt="logo" />
        <LoginInput />
        <CTARegister />
      </LoginWrapper>
      <MainBody>
        <LoginBg></LoginBg>
      </MainBody>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  min-height: 100vh;
`;

const MainBody = styled.div``;
const LoginBg = styled.div`
  background: url("/loginbg.jpg") no-repeat;
  background-size: 100%;
  background-position: center;
  min-height: 100vh;
`;
const LoginWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;
const Logo = styled.img`
  width: 170px;
  height: 120px;
  align-self: center;
  margin-bottom: 60px;
`;
