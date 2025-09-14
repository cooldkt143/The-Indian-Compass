import React from "react";
import { motion } from "framer-motion";
import bgHome1 from "../image/bg_home_1.jpg";
import bgHome2 from "../image/bg_home_2.jpg";
import bgHome3 from "../image/bg_home_3.jpg";

function Home() {
  return (
    <div className="w-full">
      {/* Fixed Transparent Header */}
      <header className="fixed top-0 left-0 w-full z-20">
        <div className="flex justify-center py-4 bg-white/10 ">
          <motion.div
            className="flex gap-4 sm:gap-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/30 backdrop-blur-md text-[#ad4146] font-medium hover:bg-[#e67530] hover:text-white transition">
              Home
            </button>
            <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/30 backdrop-blur-md text-[#ad4146] font-medium hover:bg-[#e67530] hover:text-white transition">
              About
            </button>
            <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/30 backdrop-blur-md text-[#ad4146] font-medium hover:bg-[#e67530] hover:text-white transition">
              Services
            </button>
            <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white/30 backdrop-blur-md text-[#ad4146] font-medium hover:bg-[#e67530] hover:text-white transition">
              Contact
            </button>
          </motion.div>
        </div>
      </header>

      {/* Section 1 */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover px-6 sm:px-10 lg:px-20"
        style={{ backgroundImage: `url(${bgHome1})` }}
      >
        <motion.div
          className="text-center text-[#ad4146] max-w-3xl mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 py-3 sm:py-5">
            The Indian Compass
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl mb-6 font-medium">
            Your Cultural and Spiritual Guide to India
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
            India’s culture and heritage are a vibrant tapestry woven with
            traditions, festivals, art, music, and philosophy that span
            thousands of years. From the grandeur of ancient temples and
            monuments to the simplicity of folk art and local customs, Indian
            culture embodies unity in diversity. It celebrates spirituality,
            harmony, and creativity, offering the world a timeless treasure of
            wisdom and values that continue to inspire generations.
          </p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <button className="w-28 sm:w-32 lg:w-36 h-12 sm:h-14 lg:h-16 rounded-xl text-white text-base sm:text-lg bg-[#af4c0f] hover:bg-[#e67530] transition">
              About Us
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2 */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover px-6 sm:px-10 lg:px-20"
        style={{ backgroundImage: `url(${bgHome2})` }}
      >
        <motion.div
          className="text-center text-[#ad4146] max-w-3xl mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Explore India
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
            Discover the rich diversity of India's landscapes, from the snow-capped
            Himalayas to the serene backwaters of Kerala. Each region offers a
            unique cultural experience and unforgettable adventures.
          </p>
          <button className="w-28 sm:w-32 lg:w-36 h-12 sm:h-14 lg:h-16 rounded-xl text-white text-base sm:text-lg bg-[#af4c0f] hover:bg-[#e67530] transition">
            Explore More
          </button>
        </motion.div>
      </section>

      {/* Section 3 */}
      <section
        className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover px-6 sm:px-10 lg:px-20"
        style={{ backgroundImage: `url(${bgHome3})` }}
      >
        <motion.div
          className="text-center text-[#ad4146] max-w-3xl mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
            Connect with fellow travelers, culture enthusiasts, and spiritual seekers.
            Share your experiences, learn from others, and immerse yourself in
            the heart of India’s traditions.
          </p>
          <button className="w-28 sm:w-32 lg:w-36 h-12 sm:h-14 lg:h-16 rounded-xl text-white text-base sm:text-lg bg-[#af4c0f] hover:bg-[#e67530] transition">
            Join Now
          </button>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
