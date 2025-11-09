import { Link } from "react-router-dom";
export default function AboutUs() {
  return (
    <div className="bg-[#0a0a0b] min-h-screen w-full flex items-center justify-center p-4 sm:p-6 font-[Inter]">
      <div className="bg-[#0b0b0e] rounded-2xl w-full max-w-[1400px] min-h-screen md:min-h-[90vh] flex flex-col md:flex-row overflow-hidden border border-white/5 shadow-[0_0_50px_-12px_rgba(255,255,255,0.06)]">
        
        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-[28%] border-b md:border-b-0 md:border-r border-white/5 p-6 md:p-10 flex flex-col justify-between relative text-center md:text-left gap-8">

          {/* Glow */}
          <div className="absolute inset-0 -z-10 hidden md:block">
            <div className="h-40 w-40 bg-indigo-500/10 blur-3xl rounded-full absolute bottom-10 left-5" />
          </div>

          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 animate-pulse" />
              <div>
                <p className="font-semibold text-white text-lg tracking-tight">Prev Year Papers</p>
                <p className="text-sm text-white/50">Better preparation starts here</p>
              </div>
            </div>
          </div>

          {/* Contact */}
<Link
  to="/contact"
  className="text-lg text-white underline underline-offset-4 hover:text-indigo-400 transition"
>
  Contact Us ↗
</Link>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-20 space-y-14 sm:space-y-20 text-white">
          
          {/* About */}
          <section className="animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              About Us
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl leading-relaxed">
              We are building a platform that gives students instant access to previous year exam papers —
              <span className="text-white"> no distractions, no noise, only real exam practice.</span>
            </p>
          </section>

          {/* Mission */}
          <section className="space-y-3 sm:space-y-4 animate-fade-up">
            <h2 className="text-xl sm:text-2xl font-semibold">Our Mission</h2>
            <p className="text-white/70 max-w-3xl leading-relaxed text-sm sm:text-base">
              Empower students with fast, organized and verified exam resources to make preparation smarter.
            </p>
          </section>

          {/* Philosophy */}
          <section className="space-y-3 sm:space-y-4 animate-fade-up">
            <h2 className="text-xl sm:text-2xl font-semibold">Core Philosophy</h2>
            <p className="text-white/60 max-w-3xl leading-relaxed text-sm sm:text-base">
              Simplicity • Speed • Organized content  
              <br />
              The right past papers at the right time change outcomes.
            </p>
          </section>

          {/* Team */}
          <section className="animate-fade-up">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">Our Team</h2>

            <div className="space-y-4">
              {[
                { name: "Pradeep Kumar", role: "Founder & Engineer" },
              ].map((person, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between border border-white/10 rounded-lg p-3 sm:p-4 bg-white/[0.03] hover:bg-white/[0.05] transition text-sm sm:text-base"
                >
                  <span className="font-medium">{person.name}</span>
                  <span className="text-white/50">{person.role}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tagline */}
          <footer className="pt-6 text-white/60 max-w-2xl animate-fade-up text-sm sm:text-base">
            Join thousands of learners preparing smarter.  
            Let’s build your success story together 🚀
          </footer>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.6s ease-out; }
      `}</style>
    </div>
  );
}
