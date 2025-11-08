"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from "../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuthStore } from "../store/authStore";
import { Spinner } from "./ui/spinner";
import { BACKEND_URL } from "../lib/config";

export function SigninComponent() {
  const {signin} = useAuthStore();

  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle the state
  };

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(!email || !password  ) {
        toast.error("Please fill all the fields");
        return;
      }
      if( password.length < 6){
        toast.error("Password should min 6 letters");
        return;
      }
      const response = await axios.post(`${BACKEND_URL}/api/auth/signin`, {
        email,
        password,
      });
      
      setLoading(true);
      signin(response.data.token, email!);

    if(response.data.errorMessage){
      toast.error(response.data.errorMessage);
      return;
    }

    if (!response.data.token) {
      toast.error("Error while signing in");
      return;
    }

    toast.success("Login successful! Redirecting...");
    setTimeout(() => navigate(redirectPath), 1000);
    } catch (error: any) {
      const message =
       error.response?.data.errorMessage || // backend error message
        error.message ||                 // network or other axios error
        "Something went wrong";
      toast.error(message);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle className="p-2 text-xl font-semibold">Login to your account</CardTitle>
        <CardDescription className="p-2">
          Enter your email and password to login
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email ?? ""}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/send-otp"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                 verify your mail
                </a>
              </div>


            <div className="relative flex items-center">
              <Input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10" // Adds padding on the right side for the icon
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 cursor-pointer"
                style={{ top: '50%', transform: 'translateY(-50%)' }} // Vertically center the icon
              >
                {isPasswordVisible ? (
                  <span role="img" aria-label="Hide password">
                    <VisibilityOffIcon/>
                  </span>
                ) : (
                  <span role="img" aria-label="Show password">
                    <VisibilityIcon/>
                  </span>
                )}
              </button>
            </div>

              <p className="text-xs">
                Password should be min 6 letters
              </p>
            </div>
          </div>
      <CardFooter className="flex flex-col gap-2 mt-4">
        {loading ? (
          <Button className="w-full border mt-4" disabled>
            <Spinner className="animate-spin" />
            Logging in ...
          </Button>
        ) : (
          <Button 
            type="submit" 
            className="w-full border mt-4"
            onClick={handleSignin} // if you're using form submit, keep it as submit
          >
            Sign In
          </Button>
        )}
      </CardFooter>

        </form>
      </CardContent>
    </Card>
  );
}
