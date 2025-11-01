import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function SendMail() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const handleSend = async() => {
    if (!email) {
      toast.error("Please enter an email");
      return;
    }

    // Replace this with actual email sending API
    console.log("Send email to:", email);
    const response =await axios.post('http:localhost:3000/api/auth/send-email',{email});
    if(!response.data.otp){
        //error
        toast.error("Error in sending the otp please try again");
        return;
    }

    setSuccess(`Email sent successfully to ${email}`);
    toast.success(`Email sent successfully to ${email}`)
    setEmail(""); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-lg text-white">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Send Mail
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Enter the recipient's email below and click send.
        </p>

        {/* Input */}
        <input
          type="email"
          placeholder="Recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Send
        </button>

        {/* Success message */}
        {success && (
          <p className="mt-4 text-green-400 text-center font-medium">
            {success}
          </p>
        )}

        {/* Footer */}
        <p className="mt-6 text-gray-500 text-sm text-center">
          This page allows you to send an email to a user.
        </p>
      </div>
    </div>
  );
}

export default SendMail;
