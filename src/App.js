import React from "react";
import styled from "styled-components";

import { GlobalStyles } from "./GlobalStyles";
import LoginContainer from "./LoginContainer";

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <LoginContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  min-height: 100vh;
`;

export default App;
