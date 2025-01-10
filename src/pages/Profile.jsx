import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkMode";
import { X, Check, User, Edit } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const res = JSON.parse(storedUser);
        setUser(res);
        setName(res.name);
        setUsername(res.username);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedUser = { ...user, name, username };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowModal(false);
    window.location.reload();
  };

  if (!user) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  return (
    <div
      className={`h-screen flex flex-col items-center justify-start w-full focus:outline-none p-4 md:px-10 px-2 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="flex gap-4 justify-start items-start">
        <div
          className={` p-4 rounded-full ${
            isDarkMode ? "bg-gray-800" : "bg-gray-200"
          }`}
        >
          <User size={120} />
        </div>
        <button onClick={handleEdit}>
          <Edit />
        </button>
      </div>
      <div className=" shadow-md rounded-lg p-6 w-full max-w-md flex justify-center items-center flex-col">
        <div className="mb-4 flex justify-start items-center gap-8 text-xl font-semibold">
          <h1>Name:</h1>
          <h1>{user.name}</h1>
        </div>
        <div className="mb-4 flex justify-start items-center gap-8 text-xl font-semibold">
          Username:
          <h1>{user.username}</h1>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={` rounded-lg p-6 md:w-96 w-full  ${
              isDarkMode ? "bg-black" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="mb-3">
              <label className="block mb-1">Name</label>
              <input
                type="text"
                className="border rounded w-full p-2 text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1">username</label>
              <input
                type="text"
                className="border rounded w-full p-2 text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="mr-2  text-black py-1 px-3 rounded"
              >
                <X />
              </button>
              <button
                onClick={handleSave}
                className="border-[2px] p-3 rounded-md bg-green-800 text-white"
              >
                <Check />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
