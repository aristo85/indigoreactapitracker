import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectToken } from "../../features/auth/authSlice";
import { getPaymentHistory, handleStripeToken } from "./api.service";
import LoadingButtons from "../../components/buttons/BtnLoading";
import BillingHistory from "./BillingHistory";
import moment from "moment";
import { themColors } from "../../app/constants";

const columns = [
  { id: "method", label: "Payment Method", minWidth: 170 },
  {
    id: "amount",
    label: "Ammount",
    minWidth: 100,

    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "currency", label: "Currency", align: "center", minWidth: 100 },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const BillingDashboard = () => {
  const [loading, setloading] = useState(false);
  const [rows, setrows] = useState([]);
  const token = useSelector(selectToken);
  const stripeCheckout = () => {
    setloading(true);
    handleStripeToken(token)
      .then((res) => {
        window.location.href = res.url;
      })
      .catch((er) => {
        console.log(er);
        setloading(false);
      });
  };
  useEffect(() => {
    getPaymentHistory(token)
      .then((res) => {
        const rows = res.map((el) => ({
          method: el.paymentMethod,
          amount: el.amount / 100,
          currency: el.currency,
          status: el.paymentStatus,
          date: moment(el.createdAt / 1000, "X").format("YYYY/MM/DD"),
        }));
        setrows(rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  return (
    <>
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          bgcolor: themColors.third,
          py: 2,
        }}
      >
        <Typography color={themColors.primary}>
          Your account type is Basic, maximum call stack size per day is 100, to
          remove restrictions you can become a Premium
        </Typography>
        <LoadingButtons
          title="become premium"
          variant="contained"
          onClick={() => stripeCheckout()}
          style={{ mx: "auto", mt: 1 }}
          loading={loading}
        />
      </Box>
      <Divider sx={{ height: 2, my: 2, bgcolor: themColors.secondary }} />
      <Box
        sx={{
          display: "grid",
          justifyContent: "center",
          width: 1,
          pb: 5,
        }}
      >
        <h3>Payment history</h3>
        {/* no data to show yet */}
        <BillingHistory columns={columns} rows={rows} />
      </Box>
    </>
  );
};

export default BillingDashboard;
