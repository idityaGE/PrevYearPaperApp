function Features() {
  const features = [
    {
      title: "📚 Upload Papers",
      desc: "Easily upload previous year question papers with a few clicks and help other students access resources.",
    },
    {
      title: "🔍 Smart Search",
      desc: "Quickly search papers by department, subject, semester, or year using our intelligent search filters.",
    },
    {
      title: "👨‍🏫 Verified Content",
      desc: "Every uploaded paper is verified by moderators to ensure quality and authenticity.",
    },
    {
      title: "⚡ Fast Performance",
      desc: "Optimized for speed — view and upload papers seamlessly even on low-speed connections.",
    },
    {
      title: "🔒 Secure Access",
      desc: "Your data and uploaded files are protected with modern encryption and secure APIs.",
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen w-full text-white flex flex-col items-center px-4 sm:px-8 md:px-16 py-16">
      {/* Title Section */}
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-600 drop-shadow-lg">
          ⚙️ Our Key Features
        </h1>
        <p className="mt-4 text-gray-300 text-base sm:text-lg">
          Discover what makes our platform fast, secure, and easy to use.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {features.map((f, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/20 rounded-3xl p-6 sm:p-8 backdrop-blur-lg shadow-lg hover:shadow-pink-500/20 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center"
          >
            <h2 className="text-2xl font-bold text-pink-400 mb-3">{f.title}</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="mt-16 text-gray-400 text-center text-sm sm:text-base">
        Built with ❤️ to simplify access to academic resources.
      </div>
    </div>
  );
}

export default Features;
