import HomePage from "./views/homePage";
import LoginPage from "./views/loginPage";
import ProfilePage from "./views/profilePage";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import { useAppSelector } from "./hooks";
import { useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <ToastContainer />
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
