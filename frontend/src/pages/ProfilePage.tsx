import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputForProfile = lazy(() => import("../components/InputForProfile"));

const ProfilePage = () => {
  const navigate = useNavigate();

  // === STATE VARIABLES ===
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // === FETCH USER INFO ON LOAD ===
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token || token.length < 20) {
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/api/user/profile", {
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

  // === HANDLE IMAGE CHANGE ===
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // === TOGGLE EDIT MODE ===
  const toggleEditMode = () => setIsEditing(!isEditing);

  // === SAVE CHANGES ===
  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
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

      const response = await axios.put(
        "http://localhost:3000/api/user/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile updated:", response.data);
      setIsEditing(false);
      fetchUserInfo(); // refresh data
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // === UI ===
  return (
    <div className="bg-gradient-to-r from-gray-600 to-black via-gray-800 min-h-screen w-full p-5">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden mt-20">
          <div className="p-6">
            {/* === PROFILE PICTURE === */}
            <div className="text-center mb-6 relative">
              <div className="inline-block relative">
                <img
                  src={profilePic || "/user.jpeg"}
                  alt="Profile"
                  className="rounded-full w-36 h-36 object-cover"
                />
                {isEditing && (
                  <>
                    <label
                      htmlFor="profile-pic-upload"
                      className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-10 h-10 cursor-pointer text-2xl text-center flex items-center justify-center hover:bg-blue-600"
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
            </div>

            <h2 className="text-2xl font-semibold text-center mb-4 text-white">
              User Profile
            </h2>

            {/* === PROFILE FORM === */}
            <form>
              {/* === NAME === */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white p-2">
                  Name
                </label>
                {isEditing ? (
                  <Suspense fallback={<div>Loading...</div>}>
                    <InputForProfile
                      value={name}
                      placeholder="Change Name"
                      onChange={(e: any) => setName(e.target.value)}
                    />
                  </Suspense>
                ) : (
                  <p className="text-white border p-4 rounded-md">{name}</p>
                )}
              </div>

              {/* === EMAIL (NON-EDITABLE) === */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white p-2">
                  Email
                </label>
                <p className="text-white border p-4 rounded-md">{email}</p>
              </div>

              {/* === BIO === */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white p-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    placeholder="Tell us about yourself"
                    className="text-white mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="text-white border p-4 rounded-md">{bio}</p>
                )}
              </div>

              {/* === SOCIAL LINKS === */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white">
                  Social Media Links
                </label>

                <div className="flex p-2">
                  {isEditing ? (
                    <Suspense fallback={<div>Loading...</div>}>
                      <InputForProfile
                        value={twitterHandle}
                        onChange={(e: any) =>
                          setTwitterHandle(e.target.value)
                        }
                        placeholder="Twitter handle"
                      />
                    </Suspense>
                  ) : (
                    <p className="text-white border p-4 rounded-md">
                      {twitterHandle}
                    </p>
                  )}
                </div>

                <div className="flex p-2">
                  {isEditing ? (
                    <Suspense fallback={<div>Loading...</div>}>
                      <InputForProfile
                        value={linkedinProfile}
                        onChange={(e: any) =>
                          setLinkedinProfile(e.target.value)
                        }
                        placeholder="LinkedIn profile"
                      />
                    </Suspense>
                  ) : (
                    <p className="text-white border p-4 rounded-md">
                      {linkedinProfile}
                    </p>
                  )}
                </div>
              </div>

              {/* === ACTION BUTTONS === */}
              <div className="text-center">
                {isEditing ? (
                  <button
                    type="button"
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
                    onClick={toggleEditMode}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
