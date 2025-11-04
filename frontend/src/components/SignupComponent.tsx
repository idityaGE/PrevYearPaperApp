"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Spinner } from "./ui/spinner";

export function SignupComponent() {

  const navigate = useNavigate(); 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
  setIsPasswordVisible(!isPasswordVisible); 
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast.error("Please Fill All The Fields");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        name,
        email,
        password,
      });

      const {  message ,user } = response.data;

     
      toast.success(message || "User registered successfully! Please verify your email.");

      
      navigate(`/email-verification?email=${user.email}`); 

    } catch (error: any) {
      
      toast.error(error.response?.data?.errors || "Something went wrong during signup");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-10">
      <CardHeader>
        <CardTitle className="p-2 text-xl font-semibold">Create an account</CardTitle>
        <CardDescription className="p-2">
          Please enter valid info to create a new account
        </CardDescription>
        <CardAction>
          <Button variant="link" onClick={() => navigate("/signin")}>
            Sign in
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email ?? ""}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div> */}
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
          </div>
          <CardFooter className="flex flex-col gap-2 mt-4">
            {loading ? (
              <Button className="w-full border mt-4" disabled>
                <Spinner className="animate-spin" />
                Creating account...
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="w-full border mt-4"
                onClick={handleSignup} // if you're using form submit, keep it as submit
              >
                Sign Up
              </Button>
            )}
          </CardFooter>

        </form>
      </CardContent>
    </Card>
  );
}
