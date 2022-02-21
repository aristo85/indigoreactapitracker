import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import { handleSuccessPayment } from "../modules/billing/api.service";

const BillingSuccessPage = () => {
  const navigate = useNavigate();
  const statId = useSearchParams()[0].get("statId");
  const token = useSelector(selectToken);
  useEffect(() => {
    statId && handleSuccessPayment(token, statId);
  }, [statId, token]);
  return (
    <Card
      sx={{ minWidth: 275, maxWidth: 600, mx: "auto", justifySelf: "center" }}
    >
      <CardContent>
        <Typography variant="h4" color="green" fontWeight="bold">
          Transaction Succeed!
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

export default BillingSuccessPage;
