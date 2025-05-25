import React from "react";
import { logout } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.service";

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
      <button className="bg-zinc-700 hover:bg-zinc-600 rounded-lg px-2 py-1" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
