import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import React from "react";
import SignIn from "./pages/signIn/SignIn";
import SignUp from "./pages/signUp/SignUp"
import Home from "./pages/home/Home";
import Drawspace from "./pages/drawspace/Drawspace";


const App = () => {
  let routes = useRoutes([
      { path: "/", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/home", element: <Home /> },
      { path: "/drawspace", element: <Drawspace/> },
  ]);
  return routes;
}

const AppWrapper = () => {
  return (
      <Router>
          <App />
      </Router>
  );
};

export default AppWrapper;
