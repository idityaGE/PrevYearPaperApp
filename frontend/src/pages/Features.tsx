import { Button } from "../components/ui/button";

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
      desc: "Enjoy lightning‑fast load times and smooth browsing experience.",
    },
    {
      title: "Secure Access",
      desc: "Modern security standards keep your data safe.",
    },
  ];

  return (
    <div className="bg-black min-h-screen w-full text-white flex flex-col items-center px-6 sm:px-10 md:px-20 py-20">
      {/* Title Section */}
      <div className="text-center max-w-3xl mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-400 drop-shadow-2xl">
           Our Key Features
        </h1>
        <p className="mt-4 text-gray-300 text-base sm:text-lg">
          A smarter, secure & modern platform built for students.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {features.map((f, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-7 shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.03] backdrop-blur-md flex flex-col items-center text-center"
          >
            <h2 className="text-2xl font-bold text-indigo-300 mb-3 drop-shadow-lg">{f.title}</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="mt-20 text-gray-400 text-center text-sm sm:text-base">
        Built with <i>Love</i> for smarter academic preparation.
      </div>
    </div>
  );
}

export default Features;
