import React from "react";
import { motion } from "framer-motion";

function SectionTwo({ bgImage }) {
  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover px-6 sm:px-10 lg:px-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        className="text-center text-[#ad4146] max-w-3xl mt-24 bg-white/20 p-6 rounded-xl backdrop-blur-md"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Explore India
        </h2>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
          Discover the rich diversity of India's landscapes, from the
          snow-capped Himalayas to the serene backwaters of Kerala...
        </p>
        <button className="w-28 sm:w-32 lg:w-36 h-12 sm:h-14 lg:h-16 rounded-xl text-white text-base sm:text-lg bg-[#af4c0f] hover:bg-[#e67530] transition">
          Explore More
        </button>
      </motion.div>
    </section>
  );
}

export default SectionTwo;
