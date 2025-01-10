import React, { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkmodeToggle";
import { useDarkMode } from "../context/DarkMode";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const dropdownRef = useRef(null);

  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const res = JSON.parse(storedUser);
        setUser(res.name);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  };

  useEffect(() => {
    getUser();
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser("");
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      className={`flex justify-between items-center p-4 md:px-10 px-6 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Link to="/" className="text-2xl font-bold">
        FriendList
      </Link>
      <div className="flex items-center">
        <DarkModeToggle />
        <div className="relative " ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="px-4 py-2 rounded focus:outline-none"
          >
            {isDropdownOpen ? <X /> : <Menu />}
          </button>
          {isDropdownOpen && (
            <div
              className={`absolute right-0 w-48 border rounded shadow-lg transition-all duration-300 ease-in-out z-50 ${
                isDarkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <ul className="py-2 flex flex-col">
                <span className="px-4 py-2 font-bold">{user}</span>
                <Link to="/profile" className="px-4 py-2 cursor-pointer">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left cursor-pointer"
                >
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
