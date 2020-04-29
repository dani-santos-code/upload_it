import React from "react";
import styled from "styled-components";

export default function Button({ children }) {
  return (
    <>
      <Wrapper>
        <StyledButton type="submit">{children}</StyledButton>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledButton = styled.button`
  background: #00708c;
  box-shadow: 0px 4px 4px rgba(4, 205, 255, 0.26),
    0px -4px 8px rgba(4, 255, 255, 0.19), inset 0px 0px 20px #04cdff,
    inset 0px -4px 4px rgba(11, 108, 115, 0.71),
    inset 0px 5px 5px rgba(4, 255, 255, 0.42);
  border-radius: 50px;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  outline: none;
`;
