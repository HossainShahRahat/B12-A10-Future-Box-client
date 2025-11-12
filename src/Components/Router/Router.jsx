import { createBrowserRouter } from "react-router-dom";
import Homepage from "../Homepage/Homepage";
import ErrorPage from "../ErrorPage/ErrorPage";
import App from "../../App";
import Login from "../Login/Login.jsx";
import Registration from "../Registration/Registration.jsx";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CreateEvent from "../Event/CreateEvent/CreateEvent.jsx";
import ManageEvents from "../Event/ManageEvents/ManageEvents.jsx";
import JoinedEvents from "../Event/JoinedEvents/JoinedEvents.jsx";
import EventDetails from "../Event/EventDetails/EventDetails.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/upcoming-events",
        element: <UpcomingEvents />,
      },
      {
        path: "/event/:id",
        element: <EventDetails />,
        loader: ({ params }) =>
          fetch(
            `https://b12-a10-future-box-server-eta.vercel.app/api/event/${params.id}`
          ),
      },
      {
        path: "/create-event",
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-events",
        element: (
          <PrivateRoute>
            <ManageEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "/joined-events",
        element: (
          <PrivateRoute>
            <JoinedEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
