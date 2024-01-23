import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";

import "./stylesheets/alignments.css";
import "./stylesheets/theme.css";
import "./stylesheets/sizes.css";
import "./stylesheets/custom-components.css";
import "./stylesheets/form-elements.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
   <div> 
    {loading && <Loader />}
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

   </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;
