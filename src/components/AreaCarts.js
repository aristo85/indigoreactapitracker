import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "../components/CustomTooltip";
import { CustomizedAxisTick, setStartDate } from "../modules/user/service";

const AreaCarts = ({ mydata1, mydata2, period }) => {
  const currT = new Date().getTime();
  const minDate = setStartDate(period);

  return (
    <ResponsiveContainer width="95%" aspect={3}>
      <AreaChart>
        <defs>
          <linearGradient id="color1" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="#eb2689" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#eb2689" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <defs>
          <linearGradient id="color2" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#82ca9d" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        {/* <defs>
          <linearGradient id="color3" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="0%" stopColor="#8884d8" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#8884d8" stopOpacity={0.05} />
          </linearGradient>
        </defs> */}
        <Area
          type="monotone"
          data={mydata1}
          dataKey="usage"
          stroke="#eb2689"
          fill="url(#color1)"
        />
        <Area
          type="monotone"
          data={mydata2}
          dataKey="usage"
          stroke="#82ca9d"
          fill="url(#color2)"
        />
        {/* <Area
          type="monotone"
          data={mydata3}
          dataKey="rate"
          stroke="#8884d8"
          fill="url(#color3)"
        /> */}
        <XAxis
          dataKey="date"
          // scale="time"
          axisLine={false}
          tickLine={false}
          type="number"
          tickFormatter={(num) => CustomizedAxisTick(num, period)}
          domain={[minDate, currT]}
          tick={{ fill: "#fff" }}
          // tickCount={12}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          type="number"
          domain={["dataMin - 0.5", "dataMax + 1"]}
          tick={{ fill: "#fff" }}
          // tickCount={5}
          tickFormatter={(number) => number.toFixed(0)}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <CartesianGrid opacity={0.1} horizontal vertical="" color="#243240" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaCarts;
