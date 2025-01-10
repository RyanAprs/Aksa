import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDarkMode } from "../context/DarkMode";
import { Edit, Plus, Trash, X, Check } from "lucide-react";
import Pagination from "../components/Pagination";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [filter, setFilter] = useState("none");

  const getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem("friendData");
    return storedData ? JSON.parse(storedData) : [];
  };

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem("friendData", JSON.stringify(data));
  };

  const addItem = () => {
    if (newItem) {
      const updatedData = [
        ...data,
        { id: Date.now(), name: newItem, date: new Date() },
      ];
      setData(updatedData);
      saveDataToLocalStorage(updatedData);
      setNewItem("");
    }
  };

  const updateItem = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const saveEditedItem = () => {
    const updatedData = data.map((item) =>
      item.id === editingItem.id ? { ...item, name: editingItem.name } : item
    );
    setData(updatedData);
    saveDataToLocalStorage(updatedData);
    setIsModalOpen(false);
    setEditingItem(null);
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

  const sortData = () => {
    switch (filter) {
      case "alphabet":
        return [...data].sort((a, b) => a.name.localeCompare(b.name));
      case "date":
        return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
      default:
        return data;
    }
  };

  const filteredData = sortData().filter((item) =>
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
            className="border-[2px] p-3 mr-2 w-full rounded-md text-black"
            placeholder="Add new friend"
          />
          <button onClick={addItem} className="border-[1px] p-3 rounded-md">
            <Plus />
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center w-full gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border-[2px] p-3 w-full rounded-md text-black"
            placeholder="Search friend"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-[2px] p-3 rounded-md text-black"
          >
            <option value="none">No Filter</option>
            <option value="alphabet">A - Z</option>
            <option value="date">Date</option>
          </select>
        </div>

        <div className="mb-4 flex flex-col w-full justify-center">
          <div>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-center mb-2 shadow-lg p-4 ${
                    isDarkMode ? "shadow-gray-800" : ""
                  }`}
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
                Friends Not Found!
              </div>
            )}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          paginate={paginate}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className={`p-6 rounded-md md:w-96 w-full ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <h2 className="text-lg font-bold mb-4">Edit Friend</h2>
            <input
              type="text"
              value={editingItem?.name || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, name: e.target.value })
              }
              className="border-[1px] p-3 w-full rounded-md mb-4 text-black"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border-[2px] p-3 rounded-md"
              >
                <X />
              </button>
              <button
                onClick={saveEditedItem}
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

export default Home;
