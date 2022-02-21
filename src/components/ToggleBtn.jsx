import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { themColors } from "../app/constants";

const ToggleBtn = ({ options, setAlignment, alignment }) => {
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleChange}
      sx={{ bgcolor: themColors.basic, mb: 5 }}
      color="primary"
    >
      {options.map((el) => (
        <ToggleButton key={el} value={el}>
          {el}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleBtn;
