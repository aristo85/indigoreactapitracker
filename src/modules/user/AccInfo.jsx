import React from "react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../features/user/userSlice";

const AccInfo = () => {
  const user = useSelector(selectUserData);

  return (
    <div className="acc-info">
      <h2>{user?.name}</h2>
      <div style={{ textAlign: "left" }}>
        <p>
          <span>Email:</span> {user?.email}
        </p>
        <p>
          <span>Username:</span> {user?.username}
        </p>
        <p>
          <span>Access code:</span>
          {user?.accessKey}
        </p>
        <p>
          <span>AccountID:</span> {user?._id}
        </p>
        <p>
          <span>Wallet:</span> {user?.wallet}
        </p>
      </div>
    </div>
  );
};

export default AccInfo;
