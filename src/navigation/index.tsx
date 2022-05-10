import { Routes, Route } from "react-router-dom";
import SignInScreen from "../features/SignInScreen";
import SendEmailScreen from "../features/SendEmailScreen/SendEmailScreen";
import { AuthProvider } from "../protectedRoutes/protected";
import { RequireAuth } from "../protectedRoutes/requiredAuth";

const Navigation = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignInScreen />} />
        <Route
          path="/SendEmailScreen"
          element={
            <RequireAuth>
              <SendEmailScreen />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default Navigation;
