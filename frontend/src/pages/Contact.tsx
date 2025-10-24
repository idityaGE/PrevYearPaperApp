// import React from "react";
import axios from "axios";
import  { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Contact() {
  const [message,setMessage] =useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-r from-gray-700 via-gray-900 to-black min-h-screen w-full text-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 transition-transform duration-300 hover:scale-[1.02]">
        
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-orange-800">
          Contact Us 
        </h1>
        <p className="text-center text-gray-300 mt-3 text-lg">
          We'd love to hear from you! Please share your message or feedback below.
        </p>

        {/* Textarea */}
        <div className="mt-8">
          <textarea
            value={message}
            onChange={(e)=>{
              setMessage(e.target.value);
            }}
            className="w-full h-56 p-5 text-lg text-white placeholder-gray-400 bg-white/10 border border-white/30 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400 focus:border-transparent transition-all duration-300 resize-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={async()=>{
              const token = localStorage.getItem('token');
              if(!token || token.length < 20){
                navigate('/signin')
                return;
              }

              await axios.post("http://localhost:3000/api/user/contact",{
                message
              },{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }).then(()=>{
                toast.success("Message sent successfully!");
              }).catch((err)=>{
                console.error(err);
                toast.error("Failed to send message. Please try again later.");
              })

              setMessage("");
            }}
            className="px-10 py-3 bg-gradient-to-r  from-pink-400 to-orange-800 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-amber-500/40 hover:scale-105 transition-all duration-300"
          >
            Submit Message
          </button>
        </div><label htmlFor="">jqk <q><kbd>QKL;WA-lwwwl;wewQLWwlwewl;wewl;wswwwwwwwwwwwwsWW</kbd></q></label>

      </div>
    </div>
  );
}

export default Contact;
