import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token 
  ? children 
  : <Navigate to="/"  state={{ message: "Token does not exist. Please login." }}/>;
}

export default ProtectedRoute;