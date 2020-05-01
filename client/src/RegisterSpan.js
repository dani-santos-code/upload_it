import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function CTARegister({ message, action, url }) {
  return (
    <StyledCTARegister>
      {message} <Link to={url}> {action}</Link>
    </StyledCTARegister>
  );
}

const StyledCTARegister = styled.span`
  font-size: 14px;
  margin-left: 80px;
  margin-top: 10px;
  a {
    color: #0b146e;
  }
`;
