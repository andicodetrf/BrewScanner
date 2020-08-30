import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isAuth, ...rest }) {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuth ? <Redirect to="/landing" /> : <Component {...props} />
      }
    />
  );
}

export default PrivateRoute;