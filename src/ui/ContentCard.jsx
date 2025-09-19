import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

function ContentCard({ item, index, categoryData }) {
  const categoryInfo = categoryData[item.category] || categoryData.all;
  const IconComponent = categoryInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="h-full bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
        {item.image_url && (
          <div className="relative overflow-hidden">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryInfo.color} text-white`}
              >
                <IconComponent className="w-3 h-3 mr-1" />
                {item.category}
              </span>
            </div>
          </div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {item.state}
            </span>
            {item.historical_period && (
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {item.historical_period}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
          {item.significance && (
            <div className="bg-orange-50 p-2 rounded-lg text-sm text-orange-800">
              <strong>Significance:</strong> {item.significance}
            </div>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs border rounded-lg text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ContentCard;
