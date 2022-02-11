import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AreaCarts from "../components/AreaCarts";
import LineCharts from "../components/LineCharts";
import { selectIsAuth } from "../features/auth/authSlice";
import {
  getUserAcc,
  selectTrackerData,
  selectTrackerDataErr,
} from "../features/user/userSlice";
import { formatterLastDay, typeCounter } from "../service";

const Landing = () => {
  const [chart, setchart] = useState("area");
  const auth = useSelector(selectIsAuth);
  const trackerData = useSelector(selectTrackerData);
  const trackerDataError = useSelector(selectTrackerDataErr);
  const dispatch = useDispatch();

  // console.log(formatterLastDay(trackerData), auth, trackerDataError);

  const myData = trackerData && formatterLastDay(trackerData);

  const allType1 = typeCounter(trackerData, 1);
  const allType2 = typeCounter(trackerData, 2);

  useEffect(() => {
    auth && dispatch(getUserAcc());
  }, [auth]);

  return !auth ? (
    <h2>Please log in</h2>
  ) : (
    <>
      <h2>Dynamic usages of APIs last 24 hours</h2>
      <div className="btnCharts-group">
        <div className="btnCharts btnCharts-1">
          UsersAPI: all={allType1}, average ~{(allType1 / 24).toFixed(0)} req/hr
        </div>
        <div className="btnCharts btnCharts-2">
          ARThingAPI: all={allType2}, average ~{(allType2 / 24).toFixed(0)}{" "}
          req/hr
        </div>
      </div>
      {myData ? (
        chart === "linear" ? (
          <LineCharts mydata1={myData.data1} mydata2={myData.data2} />
        ) : (
          <AreaCarts mydata1={myData.data1} mydata2={myData.data2} />
        )
      ) : (
        <div>No data to show</div>
      )}
    </>
  );
  // auth ? (
  //   <div className="landingAuth">
  //     {trackerData && (
  //       <LineCharts mydata1={myData.data1} mydata2={myData.data2} />
  //     )}
  //   </div>
  // ) : (
  //   <div>LANDING</div>
  // );
};

export default Landing;
