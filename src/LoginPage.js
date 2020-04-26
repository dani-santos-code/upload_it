import React, { useContext } from "react";
import styled from "styled-components";

import LoginInput from "./LoginInput";
import RegisterSpan from "./RegisterSpan";
import { UserContext } from "./UserContext";
import { Redirect } from "react-router-dom";

export default function LoginPage() {
  const { user, token } = useContext(UserContext);

  return (
    <>
      {token ? (
        <Redirect to="/dashboard" />
      ) : (
        <>
          <LoginWrapper>
            <Logo src="/logo.jpg" alt="logo" />
            <LoginInput />
            <RegisterSpan
              message={"Don't have an account?"}
              action={"Register"}
              url="/signup"
            />
          </LoginWrapper>
          <MainBody>
            <LoginBg></LoginBg>
          </MainBody>
        </>
      )}
    </>
  );
}

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 4fr;
//   min-height: 100vh;
// `;

const MainBody = styled.div``;
const LoginBg = styled.div`
  background: url("/loginbg.jpg") no-repeat;
  background-size: cover;
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
