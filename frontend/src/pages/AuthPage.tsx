import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SigninComponent } from "@/components/SigninComponent";
import { SignupComponent } from "@/components/SignupComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");

  useEffect(() => {
    if (location.pathname === "/signup") {
      setActiveTab("signup");
    } else {
      setActiveTab("signin");
    }
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "signup") {
      navigate("/signup");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="flex h-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xl">
              P
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SigninComponent />
            </TabsContent>
            <TabsContent value="signup">
              <SignupComponent />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
