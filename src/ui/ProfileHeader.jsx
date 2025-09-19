import React from "react";

const ProfileHeader = ({ user, userProgress, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        {userProgress && (
          <p className="text-sm text-gray-500">
            Level {userProgress.level} • {userProgress.total_points} points
          </p>
        )}
      </div>
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-orange-500 text-white rounded-lg"
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileHeader;
