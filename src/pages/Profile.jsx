import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const res = JSON.parse(storedUser);
        setUser(res);
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return <div className="p-4 md:px-10 px-2">{user.name}</div>;
};

export default Profile;
