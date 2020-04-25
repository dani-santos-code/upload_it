import React from "react";
import styled from "styled-components";

import { GlobalStyles } from "./GlobalStyles";
import MainContainer from "./MainContainer";

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <MainContainer />
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default App;
