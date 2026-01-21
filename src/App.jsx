import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Recommend from "./pages/Recommend";
import ForgotPassword from "./pages/ForgotPassword";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recommend" element={<Recommend />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;
