import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios"; 

const Navbar = () => {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/users/logout",
      {},
      { withCredentials: true }
    );

    Cookies.remove("token"); // حذف التوكن من الكوكيز
    console.log("✅ تم تسجيل الخروج وحذف التوكن");

    navigate("/login");
  } catch (error) {
    console.error("❌ خطأ في تسجيل الخروج:", error);
  }
};


  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around items-center text-white space-x-4">
        <li>
          <Link to="/login" className="hover:text-gray-400">
            تسجيل الدخول
          </Link>
        </li>
        <li>
          <Link to="/signup" className="hover:text-gray-400">
            تسجيل
          </Link>
        </li>
        <li>
          <Link to="/profile" className="hover:text-gray-400">
            الملف الشخصي
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            تسجيل الخروج
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
