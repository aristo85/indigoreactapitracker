import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";

export default function LoadingButtons({
  title,
  loading,
  variant,
  style,
  ...props
}) {
  return (
    <Stack direction="row" spacing={2}>
      <LoadingButton
        loading={loading}
        variant={variant}
        {...props}
        className="btnLoading"
        sx={{ bgcolor: "#132737", ...style }}
      >
        {title}
      </LoadingButton>
    </Stack>
  );
}
