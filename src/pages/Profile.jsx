import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Token invalid or expired
          sessionStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  if (!user) return null;

  const styles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }
    .animate-scale-in {
      animation: scaleIn 0.5s ease-out forwards;
    }
  `;

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans">
      <style>{styles}</style>

      <div className="max-w-4xl mx-auto animate-fade-in-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a4d2e] to-[#2e7d32] rounded-t-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-[#1a4d2e] text-5xl font-bold animate-scale-in">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl font-bold">{user.name}</h1>
              <p className="text-green-100">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-b-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold text-xl mb-4">👤 Personal Info</h3>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-4">📍 Location</h3>
              <p>{user.location || "Not provided"}</p>
              <p>{user.phoneNumber || "Not provided"}</p>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={handleLogout}
              className="px-8 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
