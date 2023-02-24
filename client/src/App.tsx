import HomePage from "./views/homePage";
import LoginPage from "./views/loginPage";
import ProfilePage from "./views/profilePage";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import { useAppSelector } from "./hooks";
import { useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export const App = () => {
  const mode = useAppSelector((state) => state.mode);
  // @ts-ignore
  const isAuth = Boolean(useAppSelector((state) => state.token));
  // @ts-ignore
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

//TODO:
//Video 05:06:20
//Fill Readme file after finish
//Write comments on functions
//fullName change from insert value to state value
//Change localhost on backend to server deployed host
//REPLACE ALL localhost 3001 in every files
//Change localhost in UserImage component
//Change localhost in PostWidget component
//Change localhost in PostsWidget component
//Replace all async response with axios
//Add toasts
//Add one BASE_URL in helpers and change localhost or server deploy link
//Improve code
//Resolve problem with likes
//Not refresh friends count in left My card person
