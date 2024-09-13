import ReactDOM from "react-dom/client";
import App from "./App";
import Calculate from "./components/Calculate";
import Result from "./components/Result";
import Edit from "./components/Edit";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/calculate",
    element: <Calculate />,
  },
  {
    path: "/result/:id",
    element: <Result />,
  },
  {
    path: "/edit",
    element: <Edit />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
