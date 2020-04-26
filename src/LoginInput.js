import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Clicked");
};

export default function LoginInput() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Wrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFieldSet>
          <StyledLabel>Email</StyledLabel>
          <StyledEmailInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@john.com"
          />
          <StyledLabel>Password</StyledLabel>
          <StyledInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*********"
          />
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
  margin-bottom: 10px;
  &:focus {
    outline: none;
    box-shadow: 0 0 10px #1b219f;
  }
`;

const StyledEmailInput = styled(StyledInput)`
  margin-bottom: 30px;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
`;
