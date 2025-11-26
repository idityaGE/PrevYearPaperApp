import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { BACKEND_URL } from "../lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Twitter, Linkedin, Camera, Loader2 } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(true);

  const [originalValues, setOriginalValues] = useState({
    profilePic: null as string | null,
    name: "",
    bio: "",
    twitterHandle: "",
    linkedinProfile: "",
  });

  const { token } = useAuthStore();

  const fetchUserInfo = async () => {
    if (!token || token.length < 20) {
      navigate("/signin");
      return;
    }

    try {
      setFetchingProfile(true);
      const response = await axios.get(`${BACKEND_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      const fetchedData = {
        profilePic: data.profilePicUrl || "",
        name: data.name || "",
        bio: data.bio || "",
        twitterHandle: data.twitter || "",
        linkedinProfile: data.linkedIn || "",
      };

      setName(fetchedData.name);
      setEmail(data.email || "");
      setBio(fetchedData.bio);
      setProfilePic(fetchedData.profilePic);
      setTwitterHandle(fetchedData.twitterHandle);
      setLinkedinProfile(fetchedData.linkedinProfile);

      // Store original values
      setOriginalValues(fetchedData);
    } catch (error) {
      console.error("Error fetching user info:", error);
      toast.error("Failed to load profile");
      navigate("/signin");
    } finally {
      setFetchingProfile(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCancel = () => {
    // Reset to original values without fetching
    setProfilePic(originalValues.profilePic);
    setName(originalValues.name);
    setBio(originalValues.bio);
    setTwitterHandle(originalValues.twitterHandle);
    setLinkedinProfile(originalValues.linkedinProfile);
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    if (!token || token.length < 20) {
      navigate("/signin");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("twitter", twitterHandle);
      formData.append("linkedIn", linkedinProfile);

      if (profilePic && profilePic.startsWith("data:image")) {
        const blob = await fetch(profilePic).then((res) => res.blob());
        formData.append("profilePic", blob, "profile.jpg");
      }

      await axios.put(`${BACKEND_URL}/api/user/updateProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      // Fetch fresh data after successful save
      fetchUserInfo();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (fetchingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader className="text-center pb-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profilePic || undefined} alt={name} />
                <AvatarFallback className="text-2xl">
                  {name ? getInitials(name) : <User className="h-12 w-12" />}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <label
                  htmlFor="profile-pic-upload"
                  className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-2 cursor-pointer transition-colors shadow-lg"
                  title="Upload Picture"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    id="profile-pic-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                  />
                </label>
              )}
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl">
                {name || "User Profile"}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                {email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                {isEditing
                  ? "Update your profile details"
                  : "View your profile details"}
              </CardDescription>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} disabled={loading}>
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Name
            </Label>
            {isEditing ? (
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={loading}
              />
            ) : (
              <p className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md">
                {name || "Not provided"}
              </p>
            )}
          </div>

          <Separator />

          {/* Bio Field */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                rows={4}
                disabled={loading}
                className="resize-none"
              />
            ) : (
              <p className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md min-h-[100px]">
                {bio || "No bio available"}
              </p>
            )}
          </div>

          <Separator />

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Social Links</h3>

            {/* Twitter */}
            <div className="space-y-2">
              <Label htmlFor="twitter" className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                Twitter
              </Label>
              {isEditing ? (
                <Input
                  id="twitter"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="@username"
                  disabled={loading}
                />
              ) : (
                <p className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md">
                  {twitterHandle || "Not provided"}
                </p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Label>
              {isEditing ? (
                <Input
                  id="linkedin"
                  value={linkedinProfile}
                  onChange={(e) => setLinkedinProfile(e.target.value)}
                  placeholder="linkedin.com/in/username"
                  disabled={loading}
                />
              ) : (
                <p className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md">
                  {linkedinProfile || "Not provided"}
                </p>
              )}
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <>
              <Separator />
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
