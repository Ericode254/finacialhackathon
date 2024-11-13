import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";  // Ensure correct import from theme

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNewNotification } from "../../hooks/use_new_notification";
import { useNewProfile } from "../../hooks/use_new_profile";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); // Fetch colors based on the current mode (light/dark)
  const { toggleColorMode } = useContext(ColorModeContext); // Use context to access the color mode toggle function
  const {onOpen} = useNewProfile();

  const {onNotificationOpen} = useNewNotification();

  return (
    // <div className="bg-gray-800 ">

    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={onNotificationOpen}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon  />
        </IconButton>
        <IconButton  onClick={onOpen}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
    // </div>
  );
};

export default Topbar;
