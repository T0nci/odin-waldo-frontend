import ErrorPage from "./Components/ErrorPage/ErrorPage";
import App from "./App";

const routes = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <App />,
  },
];

export default routes;
