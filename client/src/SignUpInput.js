import React, { useState, useContext } from "react";
import styled from "styled-components";
import Button from "./Button";
import { UserContext } from "./UserContext";

export default function SignUpInput() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ status: false, type: null });
  const { handleSignUp, signUpError } = useContext(UserContext);

  return (
    <Wrapper>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          const isConfirmed = passwordConfirmation === password;
          if (isConfirmed) {
            handleSignUp({ name, email, password });
          } else {
            setError({
              ...error,
              status: true,
              type: "Passwords don't match!",
            });
          }
        }}
      >
        <StyledFieldSet>
          <StyledLabel>Name</StyledLabel>
          <StyledInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required={true}
          />
          <StyledLabel>Email</StyledLabel>
          <StyledInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@john.com"
            required={true}
            pattern="[^ @]*@[^ @]*"
          />
          <StyledLabel>Password</StyledLabel>
          <StyledInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="*********"
            required={true}
          />
          <StyledLabel>Confirm Password</StyledLabel>
          <StyledPassWordConfirmationInput
            value={passwordConfirmation}
            onChange={(e) => {
              setPasswordConfirmation(e.target.value);
            }}
            type="password"
            placeholder="*********"
            required={true}
          />
          {error.status && passwordConfirmation !== password ? (
            <Error>{error.type}</Error>
          ) : (
            ""
          )}
          {signUpError && <Error>User with this email already exists.</Error>}
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

const StyledPassWordConfirmationInput = styled(StyledInput)`
  margin-bottom: 5px;
`;
const StyledLabel = styled.label`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Error = styled.span`
  color: red;
  display: block;
  font-size: 14px;
  padding-bottom: 5px;
`;
