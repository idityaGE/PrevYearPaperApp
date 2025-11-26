import axios from "axios";
import { InputOTPForm } from "../components/InputOTPForm";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";
import { BACKEND_URL } from "../lib/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function OtpVerification() {
  const email = useAuthStore((store) => store.email);

  const resendHandler = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/auth/resend-otp`, { email });
      toast.success("A new OTP has been sent to your email!");
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">OTP Verification</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email to verify your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 flex flex-col items-center">
          <InputOTPForm />

          <div className="text-center text-sm text-muted-foreground">
            Didn’t receive the code?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-primary"
              onClick={resendHandler}
            >
              Resend OTP
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OtpVerification;
