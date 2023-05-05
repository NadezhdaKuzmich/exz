import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HomeUser from "./pages/HomeUser";
import SignIn from "./pages/Forms/LogInForms/SignIn";
import SignUp from "./pages/Forms/LogInForms/SignUp";

const App = () => {
  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            {/* <Route path="/about" />
            <Route path="/contacts"/> */}
            <Route path="/sign-in" element={<SignIn/>} />
            <Route path="/sign-up" element={<SignUp/>} />
            <Route path="/user" element={<HomeUser/>} />
          </Routes>
      </Router>
    </>
  );
};

export default App;
