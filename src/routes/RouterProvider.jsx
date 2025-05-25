import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";

const RouterProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<h1>Hello World</h1>} />
      </Route>
    </Routes>
  );
};

export default RouterProvider;
