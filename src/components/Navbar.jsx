import React, { useEffect, useRef, useState } from "react";
import DarkModeToggle from "./DarkmodeToggle";
import { useDarkMode } from "../context/DarkMode";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const res = JSON.parse(storedUser);
        setUser(res.name);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    getUser();
  }, []);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className={`flex justify-between items-center p-4 md:px-10 px-2 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Link to="/" className="text-2xl font-bold">
        FriendList
      </Link>
      <div className="flex items-center">
        <DarkModeToggle />
        <div className="relative ml-4">
          <button
            ref={buttonRef}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="px-4 py-2 border rounded focus:outline-none"
          >
            Menu
          </button>
          <div
            ref={dropdownRef}
            className={`absolute right-0 mt-2 w-48 ${
              isDropdownOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
            } border rounded shadow-lg transition-all duration-300 ease-in-out`}
          >
            <ul className="py-2 flex flex-col">
              <Link to="" className="px-4 py-2 font-bold">
                {user}
              </Link>
              <Link to="/profile" className="px-4 py-2 cursor-pointer ">
                Profile
              </Link>
              <Link className="px-4 py-2 cursor-pointer" onClick={handleLogout}>
                Logout
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
