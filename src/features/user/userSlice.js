import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../config";
import axios from "axios";
import { setLogout } from "../auth/authSlice";

const initialState = {
  trackerData: null,
  status: "idle",
  error: null,
  user: null,
};

export const getUserAcc = createAsyncThunk(
  "users/myAcc",
  async (body, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    try {
      const response = await axios.get(config.apiUrl + "users", {
        headers: { Authorization: `Bearer ${token}` },
      });
// console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response?.data.message;
        (message === "invalid token" || message === "jwt expired") &&
          thunkApi.dispatch(setLogout());
      }
      return thunkApi.rejectWithValue({
        message: error.response?.data.message,
      });
    }
  }
);

export const trackerApiSlice = createSlice({
  name: "trackerApi",
  initialState,

  reducers: {
    clearTrackerDataError: (state) => {
      state.error = null;
      state.isResetedPass = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAcc.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAcc.fulfilled, (state, action) => {
        const { email, name, username, wallet, accessKey, _id, apiTracker } =
          action?.payload;
        state.status = "idle";
        state.trackerData = apiTracker;
        state.user = { email, name, username, wallet, accessKey, _id };
        state.error = null;
      })
      .addCase(getUserAcc.rejected, (state, { payload }) => {
        if (payload) state.error = payload.message;
        state.status = "idle";
      });
  },
});

export const { clearTrackerDataError } = trackerApiSlice.actions;

export const selectTrackerData = (state) => state.trackerApi.trackerData;
export const selectTrackerDatatatus = (state) => state.trackerApi.status;
export const selectTrackerDataErr = (state) => state.trackerApi.error;
export const selectUserData = (state) => state.trackerApi.user;

export default trackerApiSlice.reducer;
