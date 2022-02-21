import { Container } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AreaCarts from "../components/AreaCarts";
import ToggleBtn from "../components/ToggleBtn";
import { selectIsAuth } from "../features/auth/authSlice";
import { getUserAcc, selectTrackerData } from "../features/user/userSlice";
import { dataFormater, typeCounter } from "../modules/user/service";

const Landing = () => {
  const [alignment, setAlignment] = useState("Last day");
  const auth = useSelector(selectIsAuth);
  const trackerData = useSelector(selectTrackerData);
  const dispatch = useDispatch();

  const myData = useMemo(
    () => dataFormater(trackerData, alignment),
    [alignment, trackerData]
  );

  const stat1 = myData?.data1 && typeCounter(myData?.data1, alignment);
  const stat2 = myData?.data1 && typeCounter(myData?.data2, alignment);

  useEffect(() => {
    auth && dispatch(getUserAcc());
  }, [auth, dispatch]);
  return (
    <Container>
      <h3>Dynamic usages of APIs </h3>
      <ToggleBtn
        options={["Last day", "Last week", "Last month"]}
        setAlignment={setAlignment}
        alignment={alignment}
      />
      {myData?.data1?.length > 0 || myData?.data2?.length > 0 ? (
        <>
          <div className="btnCharts-group">
            <div className="btnCharts btnCharts-1">
              UsersAPI: all={stat1.sum}, average ~{stat1.average}
            </div>
            <div className="btnCharts btnCharts-2">
              ARThingAPI: all={stat2.sum}, average ~{stat2.average}
            </div>
          </div>
          <AreaCarts
            mydata1={myData.data1}
            mydata2={myData.data2}
            period={alignment}
          />
        </>
      ) : (
        <div>No data to show</div>
      )}
    </Container>
  );
};

export default Landing;
