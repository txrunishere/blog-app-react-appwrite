import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import {
  AddPost,
  AllPosts,
  EditPost,
  Home,
  Login,
  Post,
  Register,
} from "../pages";
import { AuthLayout } from "../components";

const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <AuthLayout>
              <Home />
            </AuthLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-post"
          element={
            <AuthLayout>
              <AddPost />
            </AuthLayout>
          }
        />
        <Route
          path="/edit-post/:slug"
          element={
            <AuthLayout>
              <EditPost />
            </AuthLayout>
          }
        />
        <Route
          path="/post/:slug"
          element={
            <AuthLayout>
              <Post />
            </AuthLayout>
          }
        />
        <Route
          path="/all-posts"
          element={
            <AuthLayout>
              <AllPosts />
            </AuthLayout>
          }
        />
      </Route>
    </Routes>
  );
};

export default RouterProvider;
