import React from "react";
import { CustomizedAxisTick } from "../modules/user/service";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    const lab = CustomizedAxisTick(label);
    const users = payload[0].payload.usage;
    const arthing = payload[1].payload.usage;
    // const rate3 = payload[2].payload.rate;
    return (
      <div className="tooltip">
        <h4>{lab}</h4>
        <h5 style={{ color: "#eb2689" }}>{"users: " + users}</h5>
        <h5 style={{ color: "#82ca9d" }}>{"arthing: " + arthing}</h5>
        {/* <h5 style={{color: '#8884d8'}}>{"rate3: " + rate3}</h5> */}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
