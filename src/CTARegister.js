import React from "react";
import styled from "styled-components";

export default function CTARegister() {
  return (
    <StyledCTARegister>
      Don't have an account? <a href="#"> Register</a>
    </StyledCTARegister>
  );
}

const StyledCTARegister = styled.span`
  font-size: 14px;
  margin-left: 80px;
  a {
    color: #0b146e;
  }
`;
