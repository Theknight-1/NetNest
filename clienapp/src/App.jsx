import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";

// COMPONENTS IMPORTS
import HomePage from "./scenes/homePage/index.jsx"
import Login from "./scenes/loginPage/index.jsx"
import ProfilePage from "./scenes/profilePage/index.jsx"
import NotFound from "../src/components/NotFound.jsx";
import Cookies from "js-cookie";
import NavbarPage from "./scenes/navbar/index.jsx";
import { setLogout } from "./state/index.js";


function App() {
  const mode = useSelector(state => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const token = useSelector((state) => state.token)
  const isAuth = Boolean(Cookies.get("Authorization"));
  const dispatch = useDispatch();


  // Check token validity and clear user data if the token is missing
  useEffect(() => {
    const storedToken = Cookies.get("Authorization");
    if (!storedToken) {
      dispatch(setLogout()); // Clear the state if the token has expired or is missing
    }
  }, [dispatch]);


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {token && <NavbarPage />}
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route exact path="/profilepage/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
