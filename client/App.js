import React from 'react'
//import Navbar from './components/Navbar'
import NavbarResponsive from './components/NavbarResponsive';
import Routes from './Routes'
import Footer from './components/Footer';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();
const theme = createTheme({
  typography: {
    fontFamily: "Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif",
    button: {
      textTransform: "none",
      fontSize: '1rem',
      //padding: '1rem 2rem'
    }
  },
  palette: {
    primary: {
      main: "#957ac1",
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavbarResponsive />
      <Routes />
      <Footer />
    </ThemeProvider>
  )
}

export default App
