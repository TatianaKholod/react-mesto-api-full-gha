import { Navigate } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRouteElement = ({ element, loggedIn }) => {
  return loggedIn ? element : <Navigate to="/sign-in" replace />;
};

export default ProtectedRouteElement;
