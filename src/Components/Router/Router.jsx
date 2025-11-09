import { createBrowserRouter } from "react-router";
import Homepage from "../Homepage/Homepage";
import ErrorPage from "../ErrorPage/ErrorPage";
import App from "../../App";
import Login from "../Login/Login.jsx";
import Registration from "../Registration/Registration.jsx";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Homepage },
      { path: "*", Component: ErrorPage },
      { path: "/Login", Component: Login },
      { path: "/Register", Component: Registration },
      { path: "/Upcoming-Events", Component: UpcomingEvents },
    ],
  },
]);
