import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDarkMode } from "../context/DarkMode";
import { Edit, Plus, Trash } from "lucide-react";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editingItemId, setEditingItemId] = useState(null); // Track item being edited

  const getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("friendData");
    return storedData ? JSON.parse(storedData) : [];
  };

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("friendData", JSON.stringify(data));
  };

  const addItem = () => {
    if (newItem) {
      if (editingItemId) {
        const updatedData = data.map((item) =>
          item.id === editingItemId ? { ...item, name: newItem } : item
        );
        setData(updatedData);
        saveDataToLocalStorage(updatedData);
        setEditingItemId(null);
      } else {
        const updatedData = [...data, { id: Date.now(), name: newItem }];
        setData(updatedData);
        saveDataToLocalStorage(updatedData);
      }
      setNewItem("");
    }
  };

  const updateItem = (item) => {
    setEditingItemId(item.id);
    setNewItem(item.name);
  };

  const deleteItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    saveDataToLocalStorage(updatedData);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    const params = new URLSearchParams(location.search);
    params.set("search", query);
    navigate({ search: params.toString() });
  };

  const setPageFromQuery = () => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page") || "1", 10);
    setCurrentPage(page);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    const params = new URLSearchParams(location.search);
    params.set("page", pageNumber);
    navigate({ search: params.toString() });
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const storedData = getDataFromLocalStorage();
    setData(storedData);
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
    setPageFromQuery();
  }, [location.search]);

  const getUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        return null;
      }
    }
    navigate("/login");
    return null;
  };

  useEffect(() => {
    const fetchedUser = getUser();
    setUser(fetchedUser);
  }, []);

  return (
    <div
      className={`h-screen flex items-start justify-center w-full focus:outline-none p-4 md:px-10 px-2 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col mx-auto p-4 xl:w-1/2 w-full items-center justify-center">
        <div className="mb-4 flex w-full justify-center items-center">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="border p-2 mr-2 w-full"
            placeholder={editingItemId ? "Edit friend" : "Add new friend"}
          />
          <button onClick={addItem} className="bg-blue-500 text-white p-2">
            <Plus />
          </button>
        </div>

        <div className="mb-4 flex justify-center items-center w-full gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border p-2 w-full"
            placeholder="Search friend"
          />
        </div>

        <div className="mb-4 flex flex-col w-full justify-center">
          <ul>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-2 shadow-lg p-4"
                >
                  <div>
                    <h1>{item.name}</h1>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => updateItem(item)} className="p-1">
                      <Edit />
                    </button>
                    <button onClick={() => deleteItem(item.id)} className="p-1">
                      <Trash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-full w-full justify-center">
                You have no friends!
              </div>
            )}
          </ul>
        </div>

        <div className="flex justify-center space-x-2">
          {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map(
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`p-2 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
