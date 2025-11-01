"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from "../store/authStore";

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

export function SignupComponent() {
  const navigate = useNavigate();
    const email = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setToken = useAuthStore((state) => state.setToken);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const email = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        name,
        email,
        password,
      });

      const { token, message } = response.data;

      if (!token) {
        toast.error("Sign up failed ...");
        return;
      }

      // Save token in Zustand if you want
      // useAuthStore.getState().setToken?.(token);
      useAuthStore.getState().setToken(token.state.token);
      useAuthStore.getState().setEmail(email);

      toast.success(message || "User registered successfully! Please verify your email.");

      // Navigate to the email verification page
      navigate("/verify-email"); 

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong during signup");
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
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
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
            <Button type="submit" className="w-full">
              Sign up
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
