"use client";

import { useState, useEffect } from "react";
import { Camera, User, Info, List } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "details" | "bookings"
  >("profile");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Load profile image from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  // Fetch user details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const res = await api.getUser(user.id);
          setUserData({
            name: res.name,
            email: res.email,
            phone: res.phone,
            description: "This is a sample description about John Doe.",
          });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch user data."
        );
      }
    };

    fetchUserData();
  }, [user]);

  // Fetch bookings for this user
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      setLoadingBookings(true);
      try {
        const res = await api.getUserBookings()// Replace with your API
        console.log(res)
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingBookings(false);
      }
    };

    if (activeTab === "bookings") fetchBookings();
  }, [user, activeTab]);

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      localStorage.setItem("profileImage", profileImage || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
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
              activeTab === "bookings"
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-primary"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            <List className="w-4 h-4" /> Bookings
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
                {isUploading ? "Uploading..." : "Upload"}
              </button>

              {error && <p className="text-red-600 text-sm">{error}</p>}
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
                  value={userData.name}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={userData.phone}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="space-y-4">
              {loadingBookings ? (
                <p>Loading bookings...</p>
              ) : bookings.length === 0 ? (
                <p>No bookings found.</p>
              ) : (
                <ul className="space-y-2">
                  {bookings.map((booking) => (
                    <li
                      key={booking.id}
                      className="border p-4 rounded-md shadow-sm bg-gray-50"
                    >
                      <p>
                        <strong>Service:</strong> {booking.serviceName}
                      </p>
                      <p>
                        <strong>Date:</strong> {booking.date}
                      </p>
                      <p>
                        <strong>Status:</strong> {booking.status}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
