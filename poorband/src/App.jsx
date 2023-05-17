import { ThemeProvider, styled } from "styled-components";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";
import Login from "./@pages/Login";
import Register from "./@pages/Register";
import Service from "./@pages/Service";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* <Login />
        <Register /> */}
        <Service />
      </ThemeProvider>
    </>
  );
}
