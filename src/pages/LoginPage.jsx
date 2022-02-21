import { Box } from "@mui/material";
import React from "react";
import Tabsi from "../components/Tabs";

const LoginPage = () => {
  return (
    <Box sx={{ width: "50%", mx: "auto", minWidth: 300 }}>
      <Tabsi style={{ width: "100%" }} />
    </Box>
  );
};

export default LoginPage;
