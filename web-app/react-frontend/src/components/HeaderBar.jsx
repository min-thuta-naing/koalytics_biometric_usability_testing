import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const HeaderBar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed bg-[#DCD6F7] py-3 px-6 top-0 left-0 w-full z-10 flex justify-between items-center shadow-md">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-700 hover:text-[#8B82BB] transition-colors"
      >
        <ArrowLeft size={24} className="mr-2" />
        <span className="font-medium">Back</span>
      </button>

      {/* Center logo and title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        <img
          src="/static/images/logo.png"
          alt="Logo"
          className="h-7 w-auto"
        />
        <h1 className="font-funnel font-bold text-xl text-black">Koalytics</h1>
      </div>

      {/* Placeholder to keep spacing balanced */}
      <div className="w-[80px]" />
    </header>
  );
};

export default HeaderBar;
