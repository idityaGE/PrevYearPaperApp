import React, { useState } from 'react';

const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState('Pradeep Kumar');
  const [email] = useState('pradeep.kumar@example.com');  // Email is non-editable

  const [twitterHandle, setTwitterHandle] = useState('www.twitter.com/username');
  const [linkedinProfile, setLinkedinProfile] = useState('www.linkedin.com/in/username');
  
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing); // Toggle the edit state
  };

  const handleSaveChanges = () => {
    setIsEditing(false);  // Disable edit mode after saving
    // Here you can add an API call to save the changes if needed
    console.log('Changes saved!');
  };

  return (
    <div className="bg-gradient-to-r from-gray-600 to-black via-gray-800 min-h-screen w-full p-5">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-lg overflow-hidden mt-20">
          <div className="p-6">
            {/* Profile Picture Section */}
            <div className="text-center mb-6 relative">
              <div className="inline-block relative">
                <img
                  src={profilePic || '/user.jpeg'}
                  alt="Profile"
                  className="rounded-full w-36 h-36 object-cover"
                />
                <label
                  htmlFor="profile-pic-upload"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full w-10 h-10 cursor-pointer text-2xl  text-center flex items-center justify-center hover:bg-blue-600"
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
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-center mb-4 text-white">User Profile</h2>
            
            <form>
              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-white p-2">Name</label>
                {isEditing ? (
                  <InputForProfile  value={name} placeholder={"Change Name"} onChange={(e: any) => { setName(e.target.value) }} />
                ) : (
                  <p className="text-white border p-4 rounded-md">{name}</p>
                )}
              </div>

              {/* Email Input (Non-Editable) */}
              <div className="mb-4 ">
                <label htmlFor="email" className="block text-sm font-medium text-white p-2">Email</label>
                <p className="text-white border p-4 rounded-md">{email}</p> {/* Email is non-editable */}
              </div>

              {/* Bio Input */}
              <div className="mb-4">
                <label htmlFor="bgiio" className="block text-sm font-medium text-white p-2">Bio</label>
                <textarea
                  value={"this is my bio"}
                  id="bio"
                  rows={3}
                  placeholder="Tell us about yourself"
                  className="text-white mt-2 p-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Social Links */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white">Social Media Links</label>
                <div className="flex p-2">
                  {isEditing ? (
                    <InputForProfile value={twitterHandle} onChange={(e: any) => setTwitterHandle(e.target.value)} placeholder="Twitter handle" />
                  ) : (
                    <p className="text-white border p-4 rounded-md">{twitterHandle}</p>
                  )}
                </div>
                <div className="flex p-2">
                  {isEditing ? (
                    <InputForProfile value={linkedinProfile} onChange={(e: any) => setLinkedinProfile(e.target.value)} placeholder="LinkedIn profile" />
                  ) : (
                    <p className="text-white border p-4 rounded-md">{linkedinProfile}</p>
                  )}
                </div>
              </div>

              {/* Edit Button */}
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

function InputForProfile(props: any) {
  return (
    <div className="flex items-center">
      {/* Icon for social links or other inputs */}
      <i className={`fab text-blue-700 mr-2`}></i>
      <input
        type="text"
        className="text-white  w-full  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border p-4"
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}

export default ProfilePage;
