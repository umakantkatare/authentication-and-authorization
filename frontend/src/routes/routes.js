import { createBrowserRouter } from "react-router";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/login", Component: LoginPage },
  { path: "/signup", Component: SignupPage },
]);

export default router;
