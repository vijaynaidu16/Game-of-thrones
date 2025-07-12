import  House  from "../components/House";
import  Home  from "../components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/house", element: <House /> },
]);

const Layout = () => {
  return <RouterProvider router={appRouter} />;
};

export default Layout;
