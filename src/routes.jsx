import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import Map from "./Components/partials/Map/Map";

const routes = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Nav />,
    children: [
      { index: true, element: <Home /> },
      { path: "/map", element: <Map /> },
    ],
  },
];

export default routes;
