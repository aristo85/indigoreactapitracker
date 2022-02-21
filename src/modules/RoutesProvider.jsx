import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MenuAppBarr from "../components/navbar/NavBar";
import { useSelector } from "react-redux";
import { selectRole } from "../features/auth/authSlice";
import { routes } from "../pages/routes";
import PrivateRoute from "../components/PrivateRoute";
import { adminRoutes } from "../pages/admin/adminRoutes";
import LoginPage from "../pages/LoginPage";

// react-router v6

const RoutesProvider = () => {
  const role = useSelector(selectRole);
  return (
    <BrowserRouter>
      <MenuAppBarr>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          {role === "admin"
            ? adminRoutes.map((el, indx) => (
                <Route
                  key={`${el.path}-${indx}`}
                  path={el.path}
                  element={<PrivateRoute Component={el.component} />}
                />
              ))
            : routes.map((el, indx) =>
                el.subRoutes ? (
                  <Route path={el.path} key={`${el.path}-${indx}`}>
                    <Route
                      index
                      element={<PrivateRoute Component={el.component} />}
                    />
                    {el.subRoutes.map((child, indChild) => (
                      <Route
                        key={indChild}
                        path={child.path}
                        element={<PrivateRoute Component={child.component} />}
                      />
                    ))}
                  </Route>
                ) : (
                  <Route
                    key={`${el.path}-${indx}`}
                    path={el.path}
                    element={<PrivateRoute Component={el.component} />}
                  />
                )
              )}
          {/* or for ex. using layout ---routeV6 */}
          {/* <Route path='layout' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path=':any' element={<Home />} />
            </Route> */}
              <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MenuAppBarr>
    </BrowserRouter>
  );
};

export default RoutesProvider;
