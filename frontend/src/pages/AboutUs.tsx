import React from "react";
import { Button } from "@mui/joy";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center px-6 py-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to <span className="text-pink-400">MyPapers</span></h1>
        <p className="text-lg text-gray-300">
          A platform to manage and access <span className="text-pink-300">university question papers</span> easily and efficiently.
        </p>
      </div>

      {/* About Section */}
      <div className="mt-16 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4 text-pink-400">About the Project</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          <strong>MyPapers</strong> is designed to simplify academic preparation by providing a centralized platform 
          where students can <span className="text-pink-300">access, organize, and manage previous year question papers</span>. 
          Whether you’re preparing for semester exams or revising for upcoming tests, MyPapers helps you stay ahead by putting the right 
          resources at your fingertips.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-16 max-w-4xl text-center">
        <h2 className="text-3xl font-semibold mb-4 text-pink-400">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed text-lg">
          Our mission is to make academic resources more accessible to every student. 
          We believe that <span className="text-pink-300">past papers are the key to future success</span>, 
          and with MyPapers, students can focus more on learning and less on searching.
        </p>
      </div>

      {/* Team Section */}
      <div className="mt-20 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold mb-10 text-center text-pink-400">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8 justify-center items-center">
          {/* Member 1 */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <div className="w-24 h-24 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
              A
            </div>
            <h3 className="text-xl font-semibold mb-2">Alxya Jacob</h3>
            <p className="text-gray-400">Founder & Developer</p>
          </div>

          {/* Placeholder Members */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <div className="w-24 h-24 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
              T
            </div>
            <h3 className="text-xl font-semibold mb-2">Team Member</h3>
            <p className="text-gray-400">Backend Engineer</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition">
            <div className="w-24 h-24 bg-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
              D
            </div>
            <h3 className="text-xl font-semibold mb-2">Team Member</h3>
            <p className="text-gray-400">UI/UX Designer</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Want to get in touch?</h2>
        <p className="text-gray-400 mb-6">We’d love to hear your feedback or collaborate with you.</p>
        <Button
          variant="soft"
          color="primary"
          size="lg"
          sx={{ background: "#ec4899", "&:hover": { background: "#db2777" } }}
          onClick={() => (window.location.href = "/contact")}
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
}
