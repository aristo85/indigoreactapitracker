import AccInfo from "../modules/user/AccInfo";
import BillingFailedPage from "./BillingFailedPage";
import BillingPage from "./BillingPage";
import BillingSuccessPage from "./BillingSuccessPage";
import LandingPage from "./LandingPage";

export const routes = [
  {
    component: LandingPage,
    path: "/",
  },
  {
    component: AccInfo,
    path: "account",
  },
  {
    component: BillingPage,
    path: "billing",
    subRoutes: [
      { component: BillingSuccessPage, path: "success" },
      { component: BillingFailedPage, path: "cancel" },
    ],
  },
];
