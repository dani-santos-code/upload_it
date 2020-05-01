import React, { useState, useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { UserContext } from "./UserContext";

export default function LoginInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loginError } = useContext(UserContext);

  return (
    <Wrapper>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin({ email, password });
        }}
      >
        <StyledFieldSet>
          <StyledLabel>Email</StyledLabel>
          <StyledInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@john.com"
          />
          <StyledLabel>Password</StyledLabel>
          <StyledPassWordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*********"
          />
          {loginError && (
            <ErrorMessage>Oh, Oh! Something went wrong!</ErrorMessage>
          )}
          <Button>Log In</Button>
        </StyledFieldSet>
      </StyledForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
`;

const StyledFieldSet = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 308px;
  height: 45px;
  left: 66px;
  top: 436px;
  background: #ffffff;
  border: 1px solid #4d4965;
  box-sizing: border-box;
  border-radius: 0px 50px 50px 0px;
  padding: 20px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    box-shadow: 0 0 10px #1b219f;
  }
`;

const StyledPassWordInput = styled(StyledInput)`
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
  padding-bottom: 5px;
`;
