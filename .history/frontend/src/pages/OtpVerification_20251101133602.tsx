import React from 'react';
import axios from 'axios';
import { InputOTPForm } from '../components/InputOTPForm';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-toastify';

function OtpVerification() {
  const email = useAuthStore((store) => store.email);

  const resendHandler = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/resend-otp', { email });
      console.log('OTP resent successfully:', res.data);
      toast.success('A new OTP has been sent to your email!');
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-lg sm:max-w-xl bg-gray-900 rounded-2xl shadow-xl p-10 sm:p-14 text-white">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">OTP Verification</h1>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Enter the 6-digit code sent to your email to verify your account
          </p>
        </div>

        {/* OTP Form */}
        <div className="my-8">
          <InputOTPForm />
        </div>

        {/* Resend OTP */}
        <div className="text-center mt-6 text-gray-400 text-sm sm:text-base">
          Didn’t receive the code?{' '}
          <button
            onClick={resendHandler}
            className="text-blue-500 hover:text-blue-400 font-semibold transition-colors"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
