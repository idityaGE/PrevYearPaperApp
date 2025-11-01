export default function AboutUs() {
  return (
    <div className="bg-[#0a0a0b] min-h-screen w-full flex items-center justify-center p-6">
      <div className="bg-[#0b0b0d] rounded-2xl w-full max-w-7xl h-[90vh] flex overflow-hidden border border-white/5">
        
        {/* LEFT STATIC SIDEBAR */}
        <div className="w-[26%] border-r border-white/5 p-10 flex flex-col justify-between">
          
          {/* Logo + Tagline */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-white/10 backdrop-blur-md" />
              <div>
                <p className="font-semibold text-white text-base">Prev Year Papers</p>
                <p className="text-sm text-white/50">Better preparation starts here</p>
              </div>
            </div>
          </div>
          
          {/* Contact Link */}
          <div>
            <a href="/contact" className="text-lg text-white underline underline-offset-4 hover:text-white/70 transition">
              Contact Us ↗
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT — SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-16 space-y-16 text-white">
          
          {/* About Section */}
          <section>
            <h1 className="text-5xl font-bold mb-6">About Us</h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              We are building a platform to help students access previous year question papers 
              easily and prepare smarter. Our mission is to simplify exam preparation and provide 
              high-quality study resources to every learner.
            </p>
          </section>

          {/* Philosophy */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Core Philosophy</h2>
            <p className="text-white/70 max-w-3xl leading-relaxed">
              We believe students deserve accessible, trusted resources that help them succeed. 
              Our platform is intuitive, fast and built to scale — ensuring every student gains 
              confidence to perform their best.
            </p>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-xl font-semibold mb-6">Our Team</h2>
            <ul className="space-y-5 text-white/80">
              {[
                { name: "Pradeep Kumar", role: "Founder & Engineer" },
                { name: "Amit Sharma", role: "Backend Developer" },
                { name: "Riya Verma", role: "Frontend + UI" },
                { name: "Arjun Singh", role: "Data & Papers Management" },
              ].map((person, i) => (
                <li key={i} className="flex justify-between border-b border-white/10 pb-3">
                  <span className="font-medium">{(i + 1).toString().padStart(2, "0")} — {person.name}</span>
                  <span className="text-white/50">{person.role}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer tagline */}
          <footer className="pt-10 text-white/70">
            Join thousands of students who trust our platform to prepare smarter.  
            <br />Let’s build your success story together.
          </footer>
        </div>
      </div>
    </div>
  );
}
