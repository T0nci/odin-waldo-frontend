import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import Play from "./Components/Play/Play";
import Name from "./Components/Name/Name";

const routes = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Nav />,
    children: [
      { index: true, element: <Home /> },
      { path: "/play/:mapId", element: <Play /> },
      { path: "/name", element: <Name /> },
    ],
  },
];

export default routes;
