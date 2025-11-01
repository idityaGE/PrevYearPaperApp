import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

type InputFieldProps = {
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
};

const InputField = ({ label, name, type = "text", placeholder, value, onChange, isTextarea = false }: InputFieldProps) => (
  <div className="mb-4">
    {isTextarea ? (
      <textarea
        id={name}
        name={name}
        rows={4}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        className="w-full p-3 text-base text-white placeholder-gray-500 bg-black border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-white/40 transition-all duration-200 resize-none"
      ></textarea>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        className="w-full p-3 text-base text-white placeholder-gray-500 bg-black border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-white/40 transition-all duration-200"
      />
    )}
  </div>
);

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // <-- UI feedback
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormData]: value,
    }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, email, subject, message } = formData;

    if (!firstName || !lastName || !email || !subject || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token || token.length < 20) {
      navigate("/signin");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/user/contact",
        { firstName, lastName, email, subject, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Message sent successfully!");
      setSuccessMessage("✅ Your message has been sent! We will get back to you soon."); // <-- Set UI message

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });

      // Optionally clear the success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="bg-[#09090b] text-foreground min-h-screen overflow-hidden">
      <div className="flex justify-center items-center h-screen w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 text-white w-full">
          {/* Left Info Panel */}
          <div className="flex justify-center items-center p-8 sm:p-12">
            <div className="w-full max-w-lg flex flex-col justify-center text-white space-y-10">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                  Contact Us
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
                    Let's Resolve Your Queries
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
                  Our support team is ready to assist you. Share your feedback, technical issues, or collaboration inquiries below.
                </p>
              </div>
              <div className="h-0.5 w-24 bg-indigo-500 rounded-full" />
              <div className="space-y-4">
                <h2 className="text-3xl font-bold mb-4">Reach Out Directly</h2>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-center space-x-3">
                    <span className="text-indigo-400 text-2xl">📞</span>
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Phone:</span> (123) 34567890
                    </p>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-indigo-400 text-2xl">📧</span>
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Email:</span>{" "}
                      <a href="mailto:email@example.com" className="ml-1 text-indigo-300 hover:text-indigo-400 transition-colors">
                        email@example.com
                      </a>
                    </p>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-indigo-400 text-2xl">🌐</span>
                    <p className="text-gray-300">
                      <span className="font-semibold text-white">Web:</span>{" "}
                      <a href="https://shadcnblocks.com" target="_blank" rel="noopener noreferrer" className="ml-1 text-indigo-300 hover:text-indigo-400 transition-colors">
                        shadcnblocks.com
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="flex justify-center items-center p-4 sm:p-12">
            <div className="w-full max-w-md p-8 sm:p-10 border border-white/10 rounded-xl">
              {successMessage && (
                <div className="mb-4 p-3 bg-green-600 text-white rounded-lg text-center font-semibold">
                  {successMessage}
                </div>
              )}

              <div className="flex gap-4">
                <div className="flex-1">
                  <InputField
                    label="First Name"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    label="Last Name"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <InputField
                label="Subject"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />

              <InputField
                label="Message"
                name="message"
                isTextarea={true}
                placeholder="Type your message here."
                value={formData.message}
                onChange={handleChange}
              />

              <button
                onClick={handleSubmit}
                className="w-full mt-4 py-3 bg-gray-200 text-black font-semibold text-lg rounded-lg shadow-sm hover:bg-gray-300 transition-all duration-200"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
