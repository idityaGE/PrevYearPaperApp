import { motion } from "framer-motion";

function Features() {
  const features = [
    {
      title: "Upload Papers",
      desc: "Easily upload previous year question papers and help other students access resources.",
    },
    {
      title: "Smart Search",
      desc: "Search papers by department, subject, semester, or year using advanced filters.",
    },
    {
      title: "Verified Content",
      desc: "All papers are verified to ensure authenticity and clarity.",
    },
    {
      title: "Fast Performance",
      desc: "Enjoy lightning-fast load times and smooth browsing experience.",
    },
    {
      title: "Secure Access",
      desc: "Modern security standards keep your data safe.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-black via-gray-950 to-black min-h-screen w-full text-white flex flex-col items-center px-6 sm:px-10 md:px-20 py-20">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mb-14"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-2xl">
          Our Key Features
        </h1>
        <p className="mt-4 text-gray-300 text-base sm:text-lg">
          A smarter, secure & modern platform built for students.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {features.map((f, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))",
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-7 shadow-xl backdrop-blur-md flex flex-col items-center text-center transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-indigo-300 mb-3 drop-shadow-lg">
              {f.title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-20 text-gray-400 text-center text-sm sm:text-base"
      >
        Built with <span className="text-pink-400 font-semibold">❤️</span> for smarter academic preparation.
      </motion.div>
    </div>
  );
}

export default Features;
