import React, { useState } from "react";

function SendMail() {
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }
    // Replace this with your actual mail sending logic
    console.log("Send email to:", email);
    alert(`Email sent to ${email}`);
    setEmail(""); // clear input
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm p-6 bg-gray-900 rounded-xl shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-4 text-center">Send Mail</h2>
        <input
          type="email"
          placeholder="Enter recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default SendMail;
