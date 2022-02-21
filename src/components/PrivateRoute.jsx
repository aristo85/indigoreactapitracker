import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getToken } from "../app/localstorage";
import { selectIsAuth, setAuth } from "../features/auth/authSlice";

const PrivateRoute = ({ Component }) => {
  const dispatch = useDispatch();
  let auth = useSelector(selectIsAuth);

  if (!auth) {
    const isAuth = getToken();
    const authData = isAuth && JSON.parse(isAuth);
    if (authData) {
      dispatch(setAuth(authData));
      auth = true;
    }
  }

  return auth ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
