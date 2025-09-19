import React from "react";

const StoriesGrid = ({ stories, onAddStory, onEditStory, onDeleteStory }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">My Stories</h3>
        <button
          onClick={onAddStory}
          className="px-3 py-1 bg-orange-500 text-white rounded"
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="border rounded-lg p-3 flex flex-col space-y-2"
          >
            <h4 className="font-medium">{story.title}</h4>
            <p className="text-sm text-gray-600">{story.description}</p>
            <div className="flex justify-between">
              <button
                onClick={() => onEditStory(story)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteStory(story.id)}
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesGrid;
