export default function AboutUs() {
  return (
    <div className="bg-black min-h-screen w-full flex items-center justify-center p-4">
      <div className="bg-[#0d0d10] rounded-2xl w-full  h-[92vh] flex overflow-hidden border border-white/10 shadow-2xl">
        
        {/* LEFT SIDEBAR */}
        <div className="w-[28%] border-r border-white/10 p-10 flex flex-col justify-between bg-gradient-to-b from-black to-[#0d0d10]">
          
          {/* Logo + tagline */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/20 ring-1 ring-indigo-500/30 backdrop-blur-md" />
              <div>
                <p className="font-semibold text-white text-lg">Prev Year Papers</p>
                <p className="text-sm text-white/50">Better preparation starts here</p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed">
              Empowering students with structured and accessible exam preparation.
            </p>
          </div>

          {/* Sidebar Links */}
          <div className="space-y-4 text-white/70 text-sm font-medium">
            <a className="hover:text-white transition">About Us</a>
            <a className="hover:text-white transition">Features</a>
            <a className="hover:text-white transition">Team</a>
            <a className="hover:text-white transition">FAQ</a>
          </div>

          {/* Contact */}
          <a
            href="/contact"
            className="text-white/80 hover:text-white transition underline underline-offset-4 text-base"
          >
            Contact Us →
          </a>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 overflow-y-auto p-14 pr-6 space-y-20 text-white no-scrollbar">
          
          {/* About */}
          <section>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
              About Us
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              We are building a modern learning platform that helps students access previous 
              year papers, improve exam strategy, and achieve academic success faster.  
              Our goal is simple — eliminate struggle, provide clarity, and empower every student.
            </p>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Our Mission</h2>
            <p className="text-white/70 max-w-3xl leading-relaxed">
              To democratize study resources and build a learning ecosystem where every student has 
              equal opportunity to prepare effectively — anytime, anywhere.
            </p>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-indigo-300">Meet Our Team</h2>
            <ul className="space-y-5 text-white/80">
              {["Pradeep Kumar", "Amit Sharma", "Riya Verma", "Arjun Singh", "Sneha Jain", "Rahul Yadav"].map((name, i) => (
                <li key={i} className="flex justify-between border-b border-white/10 pb-3 text-lg">
                  <span>{(i + 1).toString().padStart(2, "0")} — {name}</span>
                  <span className="text-white/50">Team Member</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer */}
          <footer className="pt-10 text-white/60 text-sm">
            Join thousands of students preparing smarter.  
            Let's build your success story together 🚀
          </footer>
        </div>
      </div>
    </div>
  );
}
