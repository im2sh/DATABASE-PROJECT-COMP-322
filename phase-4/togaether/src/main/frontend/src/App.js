import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/intro/IntroPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ChangePasswordPage from "./pages/changePassword/ChangePasswordPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<IntroPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route
            path="/changePassword"
            element={<ChangePasswordPage />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
