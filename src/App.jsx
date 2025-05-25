import { useDispatch } from "react-redux";
import { login, logout } from "./features/auth/authSlice";
import authService from "./appwrite/auth.service";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import RouterProvider from "./routes/RouterProvider";


const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login({ userData: data }));
        } else {
          dispatch(logout());
        }
      })
      .catch((e) => console.log("E", e))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <RouterProvider />
  ) : (
    <div>
      <SyncLoader
        loading={loading}
        cssOverride={{
          display: "block",
          margin: "2px",
          borderColor: "blue",
        }}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default App;
