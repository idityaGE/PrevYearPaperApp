import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { BACKEND_URL } from "../lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Send, Loader2 } from "lucide-react";

type FormData = {
  subject: string;
  message: string;
};

function Contact() {
  const { token } = useAuthStore();
  const [formData, setFormData] = useState<FormData>({
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof FormData]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { subject, message } = formData;

    if (!subject || !message) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (!token || token.length < 20) {
      navigate("/signin");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${BACKEND_URL}/api/user/contact`,
        { subject, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Message sent successfully!");

      setFormData({
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-4 max-w-4xl mx-auto space-y-12">
      {/* Diagonal line pattern background */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none -z-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            currentColor 10px,
            currentColor 11px
          )`,
        }}
      />

      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Have a question or feedback? We'd love to hear from you.
        </p>
      </div>

      <div>
        {/* Contact Form */}
        <Card className="max-w-3xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows={5}
                  disabled={loading}
                  className="resize-none"
                />
              </div>

              <Separator />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Contact;
