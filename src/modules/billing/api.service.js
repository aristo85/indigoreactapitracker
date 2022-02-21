import axios from "axios";
import { config } from "../../config";

export const handleStripeToken = async (token) => {
  try {
    const session = await axios.post(
      `${config.apiUrl}billing/create-payment-intent`,
      {
        amount: 12,
        currency: "usd",
        paymetnMethodType: "card",
        base_url: config.bseUrl,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return session.data;
  } catch (error) {
    throw error;
  }
};

export const handleSuccessPayment = async (token, statusId) => {
  try {
    const result = await axios.patch(
      `${config.apiUrl}billing/succeed`,
      {
        statusId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentHistory = async (token) => {
  try {
    const result = await axios.get(`${config.apiUrl}billing`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};
