import React from "react";

const BadgeCarousel = ({ badges }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="font-semibold mb-2">Badges</h3>
      <div className="flex space-x-2 overflow-x-auto">
        {badges.map((b) => (
          <div
            key={b.id}
            className="p-3 bg-orange-100 rounded-lg text-center min-w-[80px]"
          >
            🏅
            <p className="text-sm mt-1">{b.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeCarousel;
