"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { tokens } from "./theme";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";  // Adjust path as needed
import Topbar from "./scenes/global/Topbar";  // Adjust path as needed
import { SheetProvider } from "./provider/sheet-provider";
import TransactionSheet from "./scenes/mytransactions/page";
import { NotificationProvider } from "./provider/notification-provider";
import { GoalProvider } from "./provider/goal-provider";
import { DebtProvider } from "./provider/debt-provider";
import { AuthProvider } from "./provider/auth-provider";
import { ProfileProvider } from "./provider/profile-provider";
import NewGoalSheet from "./scenes/addgoal/page";
import SavingsSheet from "./scenes/savings/page"
import NewInvestmentSheet from "./scenes/investment/page";
import NewPersonalizedGoalSheet from "./scenes/personalizedGoals/page";
import NewAnomallyDetection from "./scenes/anomally/page";
import NewDebtSheet from "./scenes/addDebt/page";
// import Sidebar from "./scenes/global/Sidebar";  // Adjust path as needed
const Sidebar = dynamic(() => import("./scenes/global/Sidebar"), { ssr: false });
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [theme, colorMode] = useMode();  // Use the theme and color mode hook
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>

      <ThemeProvider theme={theme}>
        <CssBaseline />  {/* Apply baseline styles */}
        {/* <AuthProvider> */}

        <Box
          backgroundColor={colors.primary[600]}
          display="flex"

        >
          <Sidebar isSidebar={isSidebar} />

          <main className="flex-1 p-4 overflow-y-auto">
            <Topbar setIsSidebar={setIsSidebar} />
            {/* Render the children here */}
            <div className="content-area">
              <SheetProvider />
              <TransactionSheet />
              <NotificationProvider />
              <GoalProvider />   
              <DebtProvider />   
              <ProfileProvider />
              <NewGoalSheet />
              <SavingsSheet />
              <NewInvestmentSheet />
              <NewPersonalizedGoalSheet />
              <NewAnomallyDetection />
              <NewDebtSheet />
              {children}
            </div>
          </main>
        </Box>
        {/* </AuthProvider> */}
        {/* <div className="app bg-gray-900 flex h-screen"> */}
        {/* Render Sidebar and Topbar based on layout state */}


        {/* <Sidebar isSidebar={isSidebar} /> */}

        {/* <main className="flex-1 p-4 overflow-y-auto"> */}
        {/* <Topbar setIsSidebar={setIsSidebar} /> */}
        {/* Render the children here */}
        {/* <div className="content-area"> */}
        {/* {children} */}
        {/* </div> */}
        {/* </main> */}
        {/* </div> */}


      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
