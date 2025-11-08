import { createBrowserRouter } from "react-router";
import Homepage from "../Homepage/Homepage";
import ErrorPage from "../ErrorPage/ErrorPage";
import App from "../../App";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Homepage },
      { path: "*", Component: ErrorPage },
    ],
  },
]);
