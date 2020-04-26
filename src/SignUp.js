import React from "react";
import styled from "styled-components";
import SignUpInput from "./SignUpInput";
import RegisterSpan from "./RegisterSpan";
export default function SignUp() {
  return (
    <>
      <SignUpWrapper>
        <Logo src="/logo.jpg" alt="logo" />
        <SignUpInput />
        <RegisterSpan
          message={"Already have an account?"}
          action="Login"
          url="/"
        />
      </SignUpWrapper>
      <MainBody>
        <SignUpBg></SignUpBg>
      </MainBody>
    </>
  );
}

const Logo = styled.img`
  width: 170px;
  height: 120px;
  align-self: center;
  margin-bottom: 40px;
`;

const SignUpWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const MainBody = styled.div``;
const SignUpBg = styled.div`
  background: url("/dragqueen.jpg") no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`;
