import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AuthLayout = ({ children, auth = true }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (auth && auth !== authStatus) {
      navigate("/login");
    } else if (!auth && auth !== authStatus) {
      navigate("/");
    }
    setLoading(false);
  }, [auth, authStatus, navigate]);

  return loading ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthLayout;
