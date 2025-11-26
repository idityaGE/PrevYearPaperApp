import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/authStore";
import { BACKEND_URL } from "../lib/config";

const InputForProfile = lazy(() => import("../components/InputForProfile"));

const ProfilePage = () => {
  const navigate = useNavigate();
  // const {email} = useAuthStore();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [bio, setBio] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { token } = useAuthStore();
  const fetchUserInfo = async () => {
    if (!token || token.length < 20) {
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      setName(data.name || "");
      setEmail(data.email || "");
      setBio(data.bio || "");
      setProfilePic(data.profilePicUrl || "");
      setTwitterHandle(data.twitter || "");
      setLinkedinProfile(data.linkedIn || "");
    } catch (error) {
      console.error("Error fetching user info:", error);
      navigate("/signin");
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

  const toggleEditMode = () => setIsEditing(!isEditing);

  const handleSaveChanges = async () => {
    if (!token || token.length < 20) {
      navigate("/signin");
      return;
    }

    try {
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
      fetchUserInfo();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="bg-black min-h-screen w-full flex justify-center items-center py-16 px-4">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-10 text-white transition-all duration-300 hover:scale-[1.01]">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profilePic || "/user.jpeg"}
              alt="Profile"
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shadow-lg border-4 border-white/30"
            />
            {isEditing && (
              <>
                <label
                  htmlFor="profile-pic-upload"
                  className="absolute bottom-0 right-0 bg-pink-500 hover:bg-pink-600 text-white rounded-full w-10 h-10 flex justify-center items-center text-xl cursor-pointer transition"
                  title="Upload Picture"
                >
                  +
                </label>
                <input
                  type="file"
                  id="profile-pic-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </>
            )}
          </div>
          <h2 className="text-3xl font-extrabold mt-4 bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">
            {name || "User Profile"}
          </h2>
          <p className="text-gray-300 text-sm mt-1">{email}</p>
        </div>

        {/* Profile Info Section */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-300">Name</label>
            {isEditing ? (
              <Suspense fallback={<div>Loading...</div>}>
                <InputForProfile
                  value={name}
                  placeholder="Change Name"
                  onChange={(e: any) => setName(e.target.value)}
                />
              </Suspense>
            ) : (
              <p className="bg-white/5 border border-white/20 p-3 rounded-lg mt-1">
                {name}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm text-gray-300">Bio</label>
            {isEditing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Tell us about yourself"
                className="w-full mt-1 p-3 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            ) : (
              <p className="bg-white/5 border border-white/20 p-3 rounded-lg mt-1 text-white/70">
                {bio && bio.trim() !== "" ? bio : "No bio available"}
              </p>
            )}
          </div>

          {/* Socials */}
          <div>
            <label className="text-sm text-gray-300">Twitter</label>
            {isEditing ? (
              <Suspense fallback={<div>Loading...</div>}>
                <InputForProfile
                  value={twitterHandle}
                  onChange={(e: any) => setTwitterHandle(e.target.value)}
                  placeholder="Twitter handle"
                />
              </Suspense>
            ) : (
              <p className="bg-white/5 border border-white/20 p-3 rounded-lg mt-1 text-white/70">
                {twitterHandle && twitterHandle.trim() !== ""
                  ? twitterHandle
                  : "No bio available"}
              </p>
            )}

            <label className="text-sm text-gray-300 mt-4 block">LinkedIn</label>
            {isEditing ? (
              <Suspense fallback={<div>Loading...</div>}>
                <InputForProfile
                  value={linkedinProfile}
                  onChange={(e: any) => setLinkedinProfile(e.target.value)}
                  placeholder="LinkedIn profile"
                />
              </Suspense>
            ) : (
              <p className="bg-white/5 border border-white/20 p-3 rounded-lg mt-1 text-white/70">
                {linkedinProfile && linkedinProfile.trim() !== ""
                  ? linkedinProfile
                  : "No bio available"}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="text-center mt-10">
          {isEditing ? (
            <button
              type="button"
              onClick={handleSaveChanges}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold rounded-full shadow-md hover:shadow-green-400/40 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleEditMode}
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-orange-600 text-white font-semibold rounded-full shadow-md hover:shadow-pink-500/40 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
