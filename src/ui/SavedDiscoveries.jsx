import React from "react";

const SavedDiscoveries = ({ discoveries }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="font-semibold mb-2">Saved Discoveries</h3>
      <div className="space-y-3">
        {discoveries.map((d) => (
          <div
            key={d.id}
            className="border rounded-lg p-3 flex justify-between items-center"
          >
            <span>{d.title}</span>
            <span className="text-sm text-gray-500">{d.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedDiscoveries;
