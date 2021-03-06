import { Navigate } from 'react-router-dom';
import { userIsAuthenticated } from '../../utils/user_cookies.utils';


const PrivateRoute = ({children}) => {
  return userIsAuthenticated() ? children :  <Navigate to="/" />;
}

export default PrivateRoute;