import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import HomeUser from "./pages/HomeUser";
import SignIn from "./pages/Forms/LogInForms/SignIn";
import SignUp from "./pages/Forms/LogInForms/SignUp";

const App = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/user"
            element={user.username && user.password ? <HomeUser /> : <Navigate to="/"/>}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
