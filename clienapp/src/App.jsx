import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from 'react'
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";

// COMPONENTS IMPORTS
import HomePage from "./scenes/homePage/index.jsx"
import Login from "./scenes/loginPage/index.jsx"
// import ProfilePage from "./scenes/profilePage/index.jsx"
import NotFound from "../src/components/NotFound.jsx";


function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route exact path="/" element={!isAuth ? <Login /> : <HomePage />} />
            <Route exact path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            {/* <Route exact path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
