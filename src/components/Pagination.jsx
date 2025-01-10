import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDarkMode } from "../context/DarkMode";

const Pagination = ({ currentPage, totalItems, itemsPerPage, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`flex justify-center items-center gap-4 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2  rounded-sm ${currentPage === 1 ? "opacity-50" : ""}`}
      >
        <ChevronLeft />
      </button>
      <span className="text-xl font-bold">{currentPage}</span>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2  rounded-sm ${
          currentPage === totalPages ? "opacity-50" : ""
        }`}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
