import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
    <>
      <Navbar />
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 font-sans">
        <style>{styles}</style>

        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#1a4d2e] to-[#2e7d32] rounded-t-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-[#1a4d2e] text-5xl font-bold shadow-lg animate-scale-in border-4 border-white/30">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                <p className="text-green-100 text-lg flex items-center justify-center md:justify-start gap-2">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-b-3xl shadow-xl p-8 md:p-12 border-x border-b border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Personal Info */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <span className="text-2xl">👤</span> Personal Information
                </h3>

                <div className="group p-4 rounded-xl hover:bg-green-50/50 transition-colors duration-300">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Full Name
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </p>
                </div>

                <div className="group p-4 rounded-xl hover:bg-green-50/50 transition-colors duration-300">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email Address
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Location & Contact */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
                  <span className="text-2xl">📍</span> Location & Contact
                </h3>

                <div className="group p-4 rounded-xl hover:bg-green-50/50 transition-colors duration-300">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Location
                  </label>
                  <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    {user.location || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>

                <div className="group p-4 rounded-xl hover:bg-green-50/50 transition-colors duration-300">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Phone Number
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.phoneNumber || (
                      <span className="text-gray-400 italic">Not provided</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-8 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 hover:text-red-700 transition-all duration-300 cursor-pointer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
