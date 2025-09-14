import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/home"; // ✅ Capitalized

function App() {
  return (
    <Router>
      <main className="font-body text-white relative overflow-hidden">
        <Routes>
          {/* Landing page will only render at "/" */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </main>
    </Router>
  );
}

export default App;
