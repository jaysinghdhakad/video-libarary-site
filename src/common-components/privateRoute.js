import { Route, Navigate } from "react-router-dom";
import { useAuthentication } from "../contexts/Authentication-Context";

export default function PrivateRoute({ path, ...props }) {
  const { isUserLoggin } = useAuthentication();
  return isUserLoggin ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate replace state={{ from: path }} to="/log-in"></Navigate>
  );
}
