"use client"; // Ensure this is included for client-side rendering

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import { Box, Typography, useTheme } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { tokens } from "../../theme"; // Assuming tokens are correctly defined in your theme
import Header from "../../components/Header"; // Assuming Header is a reusable component
import StatBox from "../../components/StatBox"; // Assuming StatBox is a reusable component

const AIHub = () => {
  const theme = useTheme();  // Get MUI theme
  const colors = tokens(theme.palette.mode); // Destructure the color tokens based on current theme
  const router = useRouter();  // Get router for programmatic navigation

  // Function to handle navigation
  const handleNavigation = (path) => {
    router.replace(path);
  };

  return (
    <Box m="20px"> 
      {/* Header with title and subtitle */}
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      {/* Grid Layout for Stats */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)" // Creates a 12-column grid
        gridAutoRows="140px"  // Auto adjusts row height
        gap="20px" // Sets spacing between grid items
      >
        {/* Card 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => handleNavigation("/saving-recommendation")} // Handle click to navigate
          style={{ cursor: 'pointer' }} // Change cursor to pointer
        >
          <StatBox
            title="Saving"
            subtitle="Saving Recommendation"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Card 2 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => handleNavigation("/fraud")} // Handle click to navigate
          style={{ cursor: 'pointer' }} // Change cursor to pointer
        >
          <StatBox
            title="Fraud Detection"
            subtitle="Fraud Detection"
            progress="0.50"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Card 3 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => handleNavigation("/dashboard/scenes/insight")} // Handle click to navigate
          style={{ cursor: 'pointer' }} // Change cursor to pointer
        >
          <StatBox
            title="AI Insights"
            subtitle="Get AI Insights"
            progress="0.50"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Card 4 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => handleNavigation("/data-analysis")} // Handle click to navigate
          style={{ cursor: 'pointer' }} // Change cursor to pointer
        >
          <StatBox
            title="Data Analysis"
            subtitle="Analyze Data"
            progress="0.80"
            increase="+20%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Card 5 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => handleNavigation("/performance")} // Handle click to navigate
          style={{ cursor: 'pointer' }} // Change cursor to pointer
        >
          <StatBox
            title="Performance"
            subtitle="Track Performance"
            progress="0.65"
            increase="+30%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Card 6 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => handleNavigation("/report")} // Handle click to navigate
          style={{ cursor: 'pointer' }} // Change cursor to pointer
        >
          <StatBox
            title="Reports"
            subtitle="Generate Reports"
            progress="0.40"
            increase="+10%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AIHub;
