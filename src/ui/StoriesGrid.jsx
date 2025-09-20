import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, MapPin, Image, Video, FileText, Heart, MessageCircle, Eye, Calendar } from "lucide-react";
import storiesData from "../data/stories.json";

const mediaIcons = {
  image: Image,
  video: Video,
  text: FileText
};

function StoryGrid({ onAddStory, onEditStory, onDeleteStory }) {
  const [selectedStory, setSelectedStory] = useState(null);
  const displayStories = storiesData;

  const StoryCard = ({ story, index }) => {
    const MediaIcon = mediaIcons[story.media_type || "text"];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
        onClick={() => setSelectedStory(story)}
      >
        <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Media Preview */}
          <div className="relative h-64 flex items-center justify-center bg-gray-100 overflow-hidden">
            {story.media_url ? (
              <img
                src={story.media_url}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <MediaIcon className="w-14 h-14 text-gray-400" />
            )}

            {/* Media Type Badge */}
            <div className="absolute top-3 left-3 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs flex items-center space-x-1">
              <MediaIcon className="w-3 h-3" />
              <span>{story.media_type || "text"}</span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 flex space-x-2 transition-opacity duration-300">
              <button
                className="w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow"
                onClick={(e) => { e.stopPropagation(); onEditStory?.(story); }}
              >
                <Edit className="w-3 h-3" />
              </button>
              <button
                className="w-8 h-8 bg-white/80 hover:bg-white text-red-600 rounded-full flex items-center justify-center shadow"
                onClick={(e) => { e.stopPropagation(); onDeleteStory?.(story.id); }}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>

            {/* Category Badge */}
            {story.category && (
              <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs capitalize font-medium shadow">
                {story.category}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h4 className="font-semibold text-gray-900 mb-2 text-lg truncate">{story.title}</h4>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">{story.description}</p>

            {story.location && (
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <MapPin className="w-3 h-3 mr-1" />
                {story.location.city}, {story.location.state}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <div className="flex space-x-3">
                <div className="flex items-center"><Heart className="w-3 h-3 mr-1" />{story.likes_count || 0}</div>
                <div className="flex items-center"><MessageCircle className="w-3 h-3 mr-1" />{story.comments_count || 0}</div>
                <div className="flex items-center"><Eye className="w-3 h-3 mr-1" />{story.views_count || 0}</div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {story.created_date ? new Date(story.created_date).toLocaleDateString() : "-"}
              </div>
            </div>

            {/* Tags */}
            {story.tags && story.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {story.tags.slice(0, 3).map((tag, i) => (
                 <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full font-medium text-blue-600">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-gray-900">My Stories</h3>
        <button
          onClick={onAddStory}
          className="flex items-center px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Story
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayStories.length > 0 ? (
          displayStories.map((story, index) => (
            <StoryCard key={story.id} story={story} index={index} />
          ))
        ) : (
          <div className="text-center py-16 col-span-full">
            <Image className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h4 className="text-xl font-medium text-gray-500 mb-2">No Stories Yet</h4>
            <p className="text-gray-400 mb-4">Share your local culture and experiences with the community</p>
            <button
              onClick={onAddStory}
              className="flex items-center px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Story
            </button>
          </div>
        )}
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl max-h-[80vh] overflow-auto shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">{selectedStory.title}</h3>
                <p className="text-gray-700 mb-4">{selectedStory.description}</p>
                <button
                  className="px-5 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  onClick={() => setSelectedStory(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StoryGrid;
