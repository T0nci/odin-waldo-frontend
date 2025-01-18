import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import Play from "./Components/Play/Play";

const routes = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Nav />,
    children: [
      { index: true, element: <Home /> },
      { path: "/play/:mapId", element: <Play /> },
    ],
  },
];

export default routes;
