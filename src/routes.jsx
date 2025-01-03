import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Nav from "./Components/Nav/Nav";

const routes = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Nav />,
  },
];

export default routes;
