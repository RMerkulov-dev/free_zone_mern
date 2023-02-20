import HomePage from "./views/homePage";
import LoginPage from "./views/loginPage";
import ProfilePage from "./views/profilePage";

import { Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import { useAppSelector } from "./hooks";
import { useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export const App = () => {
  const mode = useAppSelector((state) => state.mode);
  // @ts-ignore
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
};

//TODO:
//Video 01:55:23
