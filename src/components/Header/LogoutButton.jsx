import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.service";
import { Button } from '../'

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // these services always return a Promise
    authService
      .logoutUser()
      .then(() => {
        dispatch(logout());
      })
      .catch((e) => console.log("Logout Button Error", e));
  };

  return (
    <div>
      <Button bgColor="bg-gray-500" className="hover:bg-gray-600" handler={() => handleLogout()}>Logout</Button>
    </div>
  );
};

export default LogoutButton;
