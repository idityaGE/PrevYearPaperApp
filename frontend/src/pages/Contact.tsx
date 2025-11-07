import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import { useAuthStore } from "../store/authStore";

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
        className="w-full p-3 text-base text-white placeholder-white bg-black border border-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
      ></textarea>
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        className="w-full p-3 text-base text-white placeholder-white bg-black border border-white rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600"
      />
    )}
  </div>
);

function Contact() {
  const { token } = useAuthStore();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
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

    if (!token || token.length < 20) {
      navigate("/signin");
      return;
    }

    try {
      console.log(formData);
      
      await axios.post(
        "http://localhost:3000/api/user/contact",
        { firstName, lastName, email, subject, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Message sent successfully!");
      setSuccessMessage("Your message has been sent!");

      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="bg-[#09090b] text-white min-h-screen">
      <div className="container mx-auto px-4 py-10 lg:py-0 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Left Section */}
        <div className="text-center lg:text-left space-y-6 px-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Contact Us
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
              We Are Here To Help
            </span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg max-w-md mx-auto lg:mx-0">
            Need support? We're just a message away.
            Reach out for help, feedback, or business inquiries.
          </p>

          <div className="space-y-3 text-lg md:text-xl">
            <p><span className="font-semibold">(+91) 8650152081</span></p>
            <p><a href="mailto:pradeepkumar434680@gmail.com" className="text-indigo-400 hover:underline">pradeepkumar434680@gmail.com</a></p>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-black border border-white/20 shadow-lg rounded-xl p-6 md:p-10 w-full max-w-lg mx-auto mt-10 sm:mt-40">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-600 text-white rounded-lg text-center font-semibold">
              {successMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
            <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>

          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
          <InputField label="Message" name="message" isTextarea value={formData.message} onChange={handleChange} />

          <button
            onClick={handleSubmit}
            className="w-full mt-2 py-3 bg-gray-200 text-black font-semibold text-lg rounded-lg hover:bg-gray-300 transition"
          >
            Send Message
          </button>
        </div>

      </div>
    </div>
  );
}

export default Contact;
