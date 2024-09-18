import ReactDOM from "react-dom/client";
import Calculate from "./components/Calculate";
import Result from "./components/Result";
import Edit from "./components/Edit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import App from "./App";
import RoundCreator from "./components/Roundcreator";
import EditDetail from "./components/EditDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/match",
    element: <App />,
  },
  {
    path: "/calculate",
    element: <Calculate />,
  },
  {
    path: "/result/:roundId/:id",
    element: <Result />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
  {
    path: "/menu",
    element: <RoundCreator />,
  },
  {
    path: "/edit-detail",
    element: <EditDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
