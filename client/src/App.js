import "./Style/App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import axios from 'axios';

axios.defaults.baseURL="http://localhost:5000/";
axios.defaults.withCredentials=true;

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
