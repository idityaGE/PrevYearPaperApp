"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Spinner } from "./ui/spinner";
import { BACKEND_URL } from "../lib/config";

export function SignupComponent() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });

      const { message, user } = response.data;

      toast.success(
        message || "User registered successfully! Please verify your email."
      );

      navigate(`/email-verification?email=${user.email}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.errors || "Something went wrong during signup"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
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
        <div className="space-y-2">
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
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {isPasswordVisible ? (
                <VisibilityOffIcon className="h-4 w-4" />
              ) : (
                <VisibilityIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
      <Button className="w-full" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Spinner className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  );
}
