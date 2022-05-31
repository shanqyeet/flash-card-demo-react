import { Navigate } from "react-router-dom";
import { userIsAuthenticated } from "../../utils/user_cookies.utils";

const PublicRoute = ({children}) => {
  return userIsAuthenticated() ? <Navigate to="/" /> : [children];
}

export default PublicRoute;