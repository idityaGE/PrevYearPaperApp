"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export function SigninComponent() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  // ✅ Correct way to use Zustand
  const email = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setToken = useAuthStore((state) => state.setToken);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });

      if(response.data.notVerified){
        toast.error("Please verify your email");
        return;
      }
    if (!response.data.token) {
      toast.error("Error while signing in");
      return;
    }

      const { token } = response.data;

      // ✅ Update Zustand state
      setToken(token);

      // optional: update email in store
      setEmail(email!);

      // optional: save token manually to localStorage
      localStorage.setItem("token", token);

      toast.success("Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error: any) {
      console.log(error.response?.data); // for debugging
      const message =
        error.response?.notVerified || // backend error message
        error.message ||                 // network or other axios error
        "Something went wrong";
      toast.error(message);
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
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button type="submit" className="w-full border">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
