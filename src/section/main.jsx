import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Main({ bgImage }) {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center bg-center bg-cover px-6 sm:px-10 lg:px-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
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
          traditions, festivals, art, music, and philosophy that span thousands
          of years...
        </p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <button
            onClick={() => navigate("/about")}
            className="w-28 sm:w-32 lg:w-36 h-12 sm:h-14 lg:h-16 rounded-xl text-white text-base sm:text-lg bg-[#af4c0f] hover:bg-[#e67530] transition"
          >
            About Us
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Main;
