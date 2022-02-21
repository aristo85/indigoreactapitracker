import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const BillingFailedPage = () => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{ minWidth: 275, maxWidth: 600, mx: "auto", justifySelf: "center" }}
    >
      <CardContent>
        <Typography variant="h4" color="orange" fontWeight="bold">
          Transaction Filed!
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ mx: "auto", bgcolor: "#132737" }}
          onClick={() => {
            navigate("/billing", { replace: true });
          }}
        >
          OK
        </Button>
      </CardActions>
    </Card>
  );
};

export default BillingFailedPage;
