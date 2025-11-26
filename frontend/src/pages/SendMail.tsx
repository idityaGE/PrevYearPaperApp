import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BACKEND_URL } from "../lib/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function SendMail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email) {
      toast.error("Please enter an email");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/send-email`, {
        email,
      });

      if (!response.data.message) {
        toast.error("Error in sending the otp please try again");
        return;
      }

      toast.success(`Email sent successfully to ${email}`);
      setEmail("");
      navigate("/email-verification");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Send Mail</CardTitle>
          <CardDescription>
            Enter the recipient's email below and click send.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Recipient Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleSend} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
          <p className="text-muted-foreground text-sm text-center">
            This page allows you to send an email to a user.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default SendMail;
