import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Dashboard/Home";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./layouts/DashboardLayout";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Settings from "./pages/Dashboard/Settings";
import Page404 from "./pages/Page404";
import { verifyAuth } from "./utils/auth";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="dashboard"
          element={<DashboardLayout />}
          loader={verifyAuth}
        >
          <Route index element={<Home />} />
          <Route path="income" element={<Income />} />
          <Route path="expenses" element={<Expense />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
