import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Map,
  Compass,
  ScanLine,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "Home", icon: <Home className="w-5 h-5" />, path: "/home" },
  { name: "Interactive Map", icon: <Map className="w-5 h-5" />, path: "/map" },
  { name: "Discover", icon: <Compass className="w-5 h-5" />, path: "/discover" },
  { name: "AI Scanner", icon: <ScanLine className="w-5 h-5" />, path: "/AIScanner" },
  { name: "Marketplace", icon: <ShoppingBag className="w-5 h-5" />, path: "/marketplace" },
];

const Header = ({ onProfileClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex fixed top-0 left-0 w-full z-50">
        <div className="w-full bg-white/10 backdrop-blur-lg py-4 shadow-lg">
          <motion.div
            className="max-w-7xl mx-auto flex items-center justify-between px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1
              className="text-2xl font-bold tracking-wide text-[#ad4146] cursor-pointer"
              onClick={() => navigate("/")}
            >
              The Indian Compass
            </h1>

            <nav className="flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md font-medium transition ${
                      isActive
                        ? "bg-[#e67530] text-white shadow-md"
                        : "bg-white/30 text-[#ad4146] hover:bg-[#e67530] hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                );
              })}

              <button
                onClick={onProfileClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md text-[#ad4146] hover:bg-[#e67530] hover:text-white transition"
              >
                <User className="w-6 h-6" />
                <span className="hidden lg:inline font-medium">Profile</span>
              </button>
            </nav>
          </motion.div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-white/10 backdrop-blur-lg z-50 shadow-lg">
        <div className="flex justify-between items-center px-4 py-3">
          <h1
            className="text-xl font-bold text-[#ad4146] cursor-pointer"
            onClick={() => navigate("/")}
          >
            The Indian Compass
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={onProfileClick}>
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Animated Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2 px-4 pb-3"
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                      isActive
                        ? "bg-[#e67530] text-white shadow-md"
                        : "bg-white/30 text-[#ad4146] hover:bg-[#e67530] hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Footer Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full backdrop-blur-lg bg-white/10 text-white shadow-lg flex justify-around items-center py-2 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center transition ${
                isActive ? "text-yellow-300" : "opacity-80"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </motion.button>
          );
        })}

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onProfileClick}
          className="flex flex-col items-center justify-center transition"
        >
          <User className="w-5 h-5" />
          <span className="text-xs mt-1">Profile</span>
        </motion.button>
      </nav>
    </>
  );
};

export default Header;
