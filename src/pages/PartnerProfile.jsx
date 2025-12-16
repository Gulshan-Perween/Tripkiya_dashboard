import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/base_url";

export default function PartnerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      // const token = localStorage.getItem("partnerToken");
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmFjOTc2OTYyMGMwMWZmYTc5ZmM4ZiIsInJvbGUiOiJwYXJ0bmVyIiwiaWF0IjoxNzY1Nzk3MzMwLCJleHAiOjE3NjgzODkzMzB9.Zzk3xK1r08e2t3ojjGfS5To7icysSiGWajwZTCYnK70";
     
      const res = await axios.get(`${BASE_URL}/api/partner/me`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log("token from profile", token);
      setProfile(res.data.partner);
    } catch (error) {
      localStorage.removeItem("partnerToken");
      window.location.href = "/partner/login";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-white animate-pulse">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <p className="text-red-400 text-center mt-20">
        Profile not found
      </p>
    );
  }

  return (
    <div className="text-white max-w-5xl mx-auto">

      {/* ===== Profile Header ===== */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 mb-10 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-4xl font-bold">
            {profile.name?.charAt(0)}
          </div>

          {/* Name & Agency */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-white/80 mt-1">{profile.agencyName}</p>
            <p className="text-sm text-white/60 mt-2">
              Partner Account
            </p>
          </div>
        </div>
      </div>

      {/* ===== Profile Details ===== */}
      <div className="grid md:grid-cols-2 gap-6">

        <ProfileCard
          label="Full Name"
          value={profile.name}
        />

        <ProfileCard
          label="Email Address"
          value={profile.email}
        />

        <ProfileCard
          label="Phone Number"
          value={profile.phone}
        />

        <ProfileCard
          label="Agency Name"
          value={profile.agencyName}
        />

      </div>
    </div>
  );
}

/* ===== Reusable Modern Card ===== */
function ProfileCard({ label, value }) {
  return (
    <div className="bg-[#1f1f1f] border border-gray-700 rounded-2xl p-6 hover:border-blue-500 transition">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className="text-lg font-semibold text-white">
        {value || "—"}
      </p>
    </div>
  );
}
