import React from "react"; 
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* 🔹 Navbar simples */}
        <nav className="bg-gray-800 text-white p-4 flex gap-6">
          <Link to="/" className="hover:text-orange-400">
            Login
          </Link>
          <Link to="/register" className="hover:text-orange-400">
            Cadastro
          </Link>
          <Link to="/dashboard" className="hover:text-orange-400">
            Dashboard
          </Link>
        </nav>

        {/* 🔹 Rotas */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
