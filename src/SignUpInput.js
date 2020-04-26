import React, { useState, useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { UserContext } from "./UserContext";

export default function SignUpInput() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  //const { handleSignUp } = useContext(UserContext);

  return (
    <Wrapper>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          //handleSignUp({ email, password });
        }}
      >
        <StyledFieldSet>
          <StyledLabel>Name</StyledLabel>
          <StyledInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
          <StyledLabel>Email</StyledLabel>
          <StyledInput
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
            place
            holder="*********"
          />
          <StyledLabel>Confirm Password</StyledLabel>
          <StyledInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*********"
          />
          <Button>Sign Up</Button>
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

// const StyledEmailInput = styled(StyledInput)`
//   margin-bottom: 30px;
// `;

const StyledLabel = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
`;
