import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
import Login from "./components/login";
import Signup from "./components/Signup";
import Home from "./components/Home"; // Capitalized
import Discover from "./components/Discover"; // Importing Discover
import AIScanner from "./components/Aiscanner"; 
import MarketPlace from "./components/MarketpPlace"; 
import Map from "./components/map";
import About from "./components/About";

function App() {
  return (
    <Router>
      <main className="font-body text-white relative overflow-hidden">
        <Routes>
          {/* Landing page will only render at "/" */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Discover" element={<Discover />} /> 
          <Route path="/AIScanner" element={<AIScanner />} />
          <Route path="/MarketPlace" element={<MarketPlace />} />
          <Route path="/map" element={<Map />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;