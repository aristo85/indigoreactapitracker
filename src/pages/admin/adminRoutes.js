import AdminAccPage from "./AdminAccPage";
import LandingAdminPage from "./LandingAdminPage";

export const adminRoutes = [
  {
    component: LandingAdminPage,
    path: "/",
  },
  {
    component: AdminAccPage,
    path: "account",
  },
];
