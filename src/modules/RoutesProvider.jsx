import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { routes } from "../../../../pages/routes";
import Landing from "../pages/Landing";
// import PrivateRoute from "../private-route/PrivateRoute";
import AccInfo from "./user/AccInfo";
import MenuAppBarr from '../components/NavBar';

// react-router v6

const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <MenuAppBarr>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="account" element={<AccInfo />} />
          {/* or for ex. using layout ---routeV6 */}
          {/* <Route path='layout' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path=':any' element={<Home />} />
            </Route> */}
        </Routes>
      </MenuAppBarr>
    </BrowserRouter>
  );
};

export default RoutesProvider;
