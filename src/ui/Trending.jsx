import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Eye, Heart, Users, Map } from "lucide-react";

// Sample Trending Data
const trendingPosts = [
  {
    id: 1,
    title: "Folk Dance Festival in Rajasthan",
    author: "Ananya Sharma",
    location: "Jaipur, Rajasthan",
    image: "https://source.unsplash.com/400x300/?rajasthan,dance",
    category: "Festival",
    views: 1200,
    likes: 340,
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Traditional Handicrafts Market",
    author: "Ravi Kumar",
    location: "Kutch, Gujarat",
    image: "https://source.unsplash.com/400x300/?handicraft,india",
    category: "Art & Craft",
    views: 950,
    likes: 220,
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "Ayurveda Wellness Retreat",
    author: "Meera Patel",
    location: "Kerala, India",
    image: "https://source.unsplash.com/400x300/?kerala,wellness",
    category: "Health",
    views: 800,
    likes: 180,
    time: "1 day ago",
  },
  {
    id: 4,
    title: "Temple Architecture Tour",
    author: "Sandeep Verma",
    location: "Hampi, Karnataka",
    image: "https://source.unsplash.com/400x300/?temple,india",
    category: "Heritage",
    views: 600,
    likes: 150,
    time: "2 days ago",
  },
];

const Trending = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <TrendingUp className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Trending Cultural Discoveries
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what fellow culture enthusiasts are discovering across India
          </p>
        </motion.div>

        {/* Trending Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 cursor-pointer group"
            >
              {/* Image Section */}
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {post.category}
                </span>

                {/* Views & Likes */}
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <div className="flex items-center space-x-1 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                    <Eye className="w-3 h-3" />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-red-500/80 text-white px-2 py-1 rounded-full text-xs">
                    <Heart className="w-3 h-3" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Map className="w-3 h-3 mr-1" />
                  {post.location}
                </div>
                <p className="text-xs text-gray-400">{post.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trending;
