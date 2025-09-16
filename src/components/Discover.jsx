import React from "react";
import Topbar from "../ui/header";
import Trending from "../ui/Trending"; 

const Discover = ({ activePage, setActivePage }) => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Topbar */}
      <Topbar active={activePage} onNavigate={setActivePage} />

      {/* Page Content */}
      <div className="pt-20 px-4">
        {/* Trending Section */}
        <Trending />

        {/* Additional Section */}
        <section className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            More to Explore
          </h2>
          <p className="text-gray-600 mt-2">
            Explore traditional food, art, music, festivals, and hidden travel gems.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Discover;
