import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Statistics from "../Pages/Statistics";
import Home from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import Contact from "../Pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/Statistics",
        element: <Statistics></Statistics>,
      },
      {
        path: "Dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "Contact",
        element: <Contact></Contact>
      },
    ],
  },
]);

export default router;
