import React from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import Login1 from "./Screens/Login/Login1";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "./Screens/global/Sidebar";
import Topbar from "./Screens/global/Topbar";
import Team from "./Screens/team";
import Form from "./Screens/form";
import DynamicChart from"./Screens/charts";
const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
        <Routes>
          <Route path="/" element={<Login1 />} />
        </Routes>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <div className="app">
          <Sidebar/>
          <main className="content">
            <Topbar/>
            <Routes>
            <Route path="/team" element={<Team />} />
            <Route path="/form" element={<Form />} />
            <Route path="/charts/:name" element={<DynamicChart />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
