import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { BACKEND_URL } from "../lib/config";
import { contactInfo } from "../config/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Send, Loader2 } from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

function Contact() {
  const { token } = useAuthStore();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
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
    const { firstName, lastName, email, subject, message } = formData;

    if (!firstName || !lastName || !email || !subject || !message) {
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
        { firstName, lastName, email, subject, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Message sent successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Get in Touch
            </h2>

            <div className="space-y-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm">{contactInfo.email}</span>
              </a>

              <a
                href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm">{contactInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={loading}
                  />
                </div>

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
    </div>
  );
}

export default Contact;
