"use client";

import { useState, useEffect } from "react";
import { Camera, Save, User, Info, Edit2 } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "details" | "description"
  >("profile");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+971 50 123 4567",
    address: "Dubai, UAE",
    description:
      "",
  });

  // Load profile image (replace with API call)
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file)); // preview
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image to upload.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // Replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem("profileImage", profileImage || "");
      setSuccess("Profile image updated successfully.");
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUserChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDetails = async () => {
    setSuccess(null);
    setError(null);
    setIsUploading(true);
    try {
      // Replace with API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess("Profile details updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update details."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-t ${
              activeTab === "profile"
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-primary"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="w-4 h-4" /> Profile
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-t ${
              activeTab === "details"
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-primary"
            }`}
            onClick={() => setActiveTab("details")}
          >
            <Info className="w-4 h-4" /> Details
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-t ${
              activeTab === "description"
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-primary"
            }`}
            onClick={() => setActiveTab("description")}
          >
            <Edit2 className="w-4 h-4" /> Description
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-32 h-32">
                <img
                  src={profileImage || "/default-profile.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border border-gray-200"
                />
                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-0 right-0 bg-primary p-2 rounded-full cursor-pointer hover:bg-primary/90 transition"
                  title="Change profile image"
                >
                  <Camera className="text-white w-5 h-5" />
                </label>
                <input
                  type="file"
                  id="profileUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading || !selectedFile}
                className="flex items-center gap-2 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isUploading ? "Uploading..." : "Upload"}
              </button>

              {error && <p className="text-red-600 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleUserChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleUserChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleUserChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleUserChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <button
                onClick={handleSaveDetails}
                disabled={isUploading}
                className="flex items-center gap-2 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isUploading ? "Saving..." : "Save Details"}
              </button>
            </div>
          )}

          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Description
              </label>
              <textarea
                name="description"
                value={userData.description}
                onChange={handleUserChange}
                rows={5}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
              />
              <button
                onClick={handleSaveDetails}
                disabled={isUploading}
                className="flex items-center gap-2 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                {isUploading ? "Saving..." : "Save Description"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
